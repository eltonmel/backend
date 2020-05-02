module.exports = (app) => {
  const { isSet, isNotSet } = app.src.Validations.Validate;

  const save = async (req, res) => {
    const paymentMethod = {
      id: req.params.id,
      description: req.body.description,
    };

    try {
      isSet(paymentMethod.description, 'Descrição não informada');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (paymentMethod.id) {
      const paymentMethodFromDb = await app
        .db('payment_methods')
        .select('deleted_at')
        .where({ id: paymentMethod.id })
        .first();

      try {
        isSet(paymentMethodFromDb, 'Forma de pagamento não cadastrada');
        isNotSet(
          paymentMethodFromDb.deleted_at,
          'Forma de pagamento está excluída e não pode ser alterada'
        );
      } catch (msg) {
        return res.status(400).send(msg);
      }

      paymentMethod.updated_at = new Date();
      await app
        .db('payment_methods')
        .update(paymentMethod)
        .where({ id: paymentMethod.id })
        .whereNull('deleted_at')
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      delete paymentMethod.id;
      paymentMethod.created_at = new Date();
      await app
        .db('payment_methods')
        .insert(paymentMethod)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = async (req, res) => {
    await app
      .db('payment_methods')
      .whereNull('deleted_at')
      .then((paymentMethods) => res.json(paymentMethods))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const paymentMethod = await app
      .db('payment_methods')
      .where({ id: req.params.id })
      .first();

    try {
      isSet(paymentMethod, 'Forma de pagamento não cadastrada');
      isNotSet(paymentMethod.deleted_at, 'Forma de pagamento está excluída');
      res.json(paymentMethod);
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;

    const paymentMethod = await app
      .db('payment_methods')
      .select('deleted_at')
      .where({ id })
      .first();

    try {
      isSet(paymentMethod, 'Forma de pagamento não cadastrada');

      paymentMethod.deleted_at = new Date();

      const rowsUpdated = await app
        .db('payment_methods')
        .update(paymentMethod)
        .whereNull('deleted_at')
        .where({ id })
        .catch((err) => res.status(500).send(err));

      if (typeof rowsUpdated === 'object') {
        return;
      }

      isSet(rowsUpdated, 'Forma de pagamento já está excluída');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
