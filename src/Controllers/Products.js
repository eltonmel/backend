module.exports = (app) => {
  const { isSet, isNotSet, isNumeric } = app.src.Validations.Validate;

  const save = async (req, res) => {
    const product = {
      id: req.params.id,
      bar_code: req.body.bar_code,
      description: req.body.description,
      comp: req.body.comp,
      brand: req.body.brand,
      cost_price: parseFloat(req.body.cost_price),
      sale_price: parseFloat(req.body.sale_price),
    };

    try {
      isSet(product.description, 'Descrição não informada');
      isNumeric(product.cost_price, 'Preço de Custo');
      isNumeric(product.sale_price, 'Preço de Venda');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (product.sale_price === 0) {
      product.profit_percent = 0;
    } else if (product.cost_price === 0) {
      product.profit_percent = 100;
    } else {
      product.profit_percent =
        ((product.sale_price - product.cost_price) / product.cost_price) * 100;
    }

    if (product.id) {
      const productFromDb = await app
        .db('products')
        .select('deleted_at')
        .where({ id: product.id })
        .first();

      try {
        isSet(productFromDb, 'Produto não cadastrado');
        isNotSet(
          productFromDb.deleted_at,
          'Produto está excluído e não pode ser alterado'
        );
      } catch (msg) {
        return res.status(400).send(msg);
      }

      product.updated_at = new Date();
      await app
        .db('products')
        .update(product)
        .where({ id: product.id })
        .whereNull('deleted_at')
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      delete product.id;
      product.created_at = new Date();
      await app
        .db('products')
        .insert(product)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const updateStock = async (req, res) => {
    try {
      const stock = parseFloat(req.body.stock);
      isNumeric(stock, 'Estoque');

      const id = req.params.id;

      const product = await app
        .db('products')
        .select('stock', 'updated_at')
        .where({ id })
        .first();
      isSet(product, 'Produto não cadastrado');

      product.stock = parseFloat(product.stock) + stock;
      product.updated_at = new Date();

      const rowsUpdated = await app
        .db('products')
        .update(product)
        .whereNull('deleted_at')
        .where({ id })
        .catch((err) => res.status(500).send(err));

      if (typeof rowsUpdated === 'object') {
        return;
      }

      isSet(rowsUpdated, 'Produto está excluído e não pode ser alterado');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const get = async (req, res) => {
    await app
      .db('products')
      .whereNull('deleted_at')
      .then((products) => res.json(products))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const product = await app
      .db('products')
      .where({ id: req.params.id })
      .first();

    try {
      isSet(product, 'Produto não cadastrado');
      isNotSet(product.deleted_at, 'Produto está excluído');
      res.json(product);
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;

    const product = await app
      .db('products')
      .select('deleted_at')
      .where({ id })
      .first();

    try {
      isSet(product, 'Produto não cadastrado');

      product.deleted_at = new Date();

      const rowsUpdated = await app
        .db('products')
        .update(product)
        .whereNull('deleted_at')
        .where({ id })
        .catch((err) => res.status(500).send(err));

      if (typeof rowsUpdated === 'object') {
        return;
      }

      isSet(rowsUpdated, 'Produto já está excluído');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, updateStock, get, getById, remove };
};
