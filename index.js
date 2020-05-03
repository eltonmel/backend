const express = require('express');
const consign = require('consign');

require('dotenv/config');

const app = express();
const db = require('./src/Config/Database');

app.db = db;

consign()
  .then('./src/Config/Middlewares.js')
  .then('./src/Validations')
  .then('./src/Controllers')
  .then('./src/Config/Routes.js')
  .into(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend executando...');
});
