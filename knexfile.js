module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL_DEV,
    migrations: {
      tableName: 'knex_project_node',
      directory: './src/Database/Migrations',
    },
    seeds: {
      directory: './src/Database/Seeds',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_project_node',
      directory: './src/Database/Migrations',
    },
    seeds: {
      directory: './src/Database/Seeds',
    },
    useNullAsDefault: true,
  },
};
