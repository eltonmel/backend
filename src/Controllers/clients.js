module.exports = (app) => {
  const { exists } = app.src.Validations.Validate;

  const save = async (req, res) => {
    const { cpf_cnpj, name, address, comp, phone, email } = req.body;
    const { id } = req.params;

    try {
      exists(name, 'Nome não informado');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (id) {
      await app
        .db('clients')
        .update({
          cpf_cnpj,
          name,
          address,
          comp,
          phone,
          email,
          updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3),
        })
        .where({ id })
        .whereNull('deleted_at')
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      await app
        .db('clients')
        .insert({
          cpf_cnpj,
          name,
          address,
          comp,
          phone,
          email,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 3),
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = async (req, res) => {
    await app
      .db('clients')
      .select()
      .whereNull('deleted_at')
      .then((clients) => res.json(clients))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    await app
      .db('clients')
      .select()
      .where({ id })
      .whereNull('deleted_at')
      .first()
      .then((client) => res.json(client))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const { id } = req.params;

      const client = await app.db('clients').select().where({ id }).first();
      exists(client, 'Cliente não cadastrado');

      const rowsUpdated = await app
        .db('clients')
        .update({ deleted_at: new Date(Date.now() - 1000 * 60 * 60 * 3) })
        .whereNull('deleted_at')
        .where({ id });
      exists(rowsUpdated, 'Cliente já está excluido');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
