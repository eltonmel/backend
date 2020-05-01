const express = require('express');
const consign = require('consign');

const app = express();
const db = require('./src/Config/Database');

app.db = db;

consign()
  .then('./src/Config/Middlewares.js')
  .then('./src/Validations')
  .then('./src/Controllers')
  .then('./src/Config/Routes.js')
  .into(app);

app.listen(5000, () => {
  console.log('Backend executando...');
});
