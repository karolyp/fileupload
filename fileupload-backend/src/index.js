const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { APP_PORT } = require('./constants');
const parameterStoreService = require('./services/parameterStoreService');

const loadSecrets = async () => {
  const cica = await parameterStoreService.getSecret('cica');
  console.log(cica);
};

loadSecrets().then(() => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello!</h1>');
  });

  app.listen(APP_PORT, () => {
    console.log(`App started on port ${APP_PORT}.`);
  });
}).catch((error) => {
  console.log(`Error during fetching parameters: ${error.code}`);
});