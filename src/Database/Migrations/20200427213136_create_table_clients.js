exports.up = (knex) => {
  return knex.schema
    .createTable('clients', (table) => {
      table.increments();
      table.string('cpf_cnpj');
      table.string('name').notNull();
      table.string('address');
      table.string('comp');
      table.string('phone');
      table.string('email');
      table.timestamps();
      table.timestamp('deleted_at');
    })
    .raw('ALTER SEQUENCE clients_id_seq RESTART WITH 1000');
};

exports.down = (knex) => {
  return knex.schema.dropTable('clients');
};
