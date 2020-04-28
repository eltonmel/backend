const db = require('./.env');

module.exports = {
  client: 'postgresql',
  connection: db,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_project_node',
    directory: 'Migrations',
  },
  useNullAsDefault: true,
};
