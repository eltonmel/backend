module.exports = (app) => {
  const { isSet, isNotSet } = app.src.Validations.Validate;

  const save = async (req, res) => {
    const client = {
      id: req.params.id,
      cpf_cnpj: req.body.cpf_cnpj,
      name: req.body.name,
      address: req.body.address,
      comp: req.body.comp,
      phone: req.body.phone,
      email: req.body.email,
    };

    try {
      isSet(client.name, 'Nome não informado');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (client.id) {
      const clientFromDb = await app
        .db('clients')
        .select('deleted_at')
        .where({ id: client.id })
        .first();

      try {
        isSet(clientFromDb, 'Cliente não cadastrado');
        isNotSet(
          clientFromDb.updated_at,
          'Cliente está excluído e não pode ser alterado'
        );
      } catch (msg) {
        return res.status(400).send(msg);
      }

      client.updated_at = new Date();
      await app
        .db('clients')
        .update(client)
        .where({ id: client.id })
        .whereNull('deleted_at')
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      delete client.id;
      client.created_at = new Date();
      await app
        .db('clients')
        .insert(client)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = async (req, res) => {
    await app
      .db('clients')
      .whereNull('deleted_at')
      .then((clients) => res.json(clients))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const client = await app.db('clients').where({ id: req.params.id }).first();

    try {
      isSet(client, 'Cliente não cadastrado');
      isNotSet(client.deleted_at, 'Cliente está excluído');
      res.json(client);
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    const id = req.params.id;

    const client = await app
      .db('clients')
      .select('deleted_at')
      .where({ id })
      .first();

    try {
      isSet(client, 'Cliente não cadastrado');

      client.deleted_at = new Date();

      const rowsUpdated = await app
        .db('clients')
        .update(client)
        .whereNull('deleted_at')
        .where({ id })
        .catch((err) => res.status(500).send(err));

      if (typeof rowsUpdated === 'object') {
        return;
      }

      isSet(rowsUpdated, 'Cliente já está excluído');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
