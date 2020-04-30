exports.up = (knex) => {
  return knex.schema
    .createTable('payment_methods', (table) => {
      table.increments();
      table.string('description').notNull();
      table.timestamps();
      table.timestamp('deleted_at');
    })
    .raw('ALTER SEQUENCE payment_methods_id_seq RESTART WITH 1000');
};

exports.down = (knex) => {
  return knex.schema.dropTable('payment_methods');
};
