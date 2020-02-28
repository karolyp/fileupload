const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { APP_PORT } = require('./constants');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello!</h1>');
});

app.listen(APP_PORT, () => {
  console.log(`App started on port ${APP_PORT}.`);
});
