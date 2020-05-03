const knex = require('knex');
const config = require('../../knexfile');

module.exports = knex(
  process.env.DATABASE_URL_DEV ? config.development : config.production
);
