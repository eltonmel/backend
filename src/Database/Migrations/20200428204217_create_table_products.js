exports.up = (knex) => {
  return knex.schema
    .createTable('products', (table) => {
      table.increments();
      table.string('bar_code');
      table.string('description').notNull();
      table.string('comp');
      table.string('brand');
      table.decimal('cost_price').defaultTo(0);
      table.decimal('sale_price').defaultTo(0);
      table.decimal('profit_percent', 6, 3).defaultTo(0);
      table.decimal('stock', 10, 3).defaultTo(0);
      table.timestamps();
      table.timestamp('deleted_at');
    })
    .raw('ALTER SEQUENCE products_id_seq RESTART WITH 1000');
};

exports.down = (knex) => {
  return knex.schema.dropTable('products');
};
