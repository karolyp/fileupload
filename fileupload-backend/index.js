const express = require('express');
require('dotenv').config();
const { APP_PORT } = require('./constants');

const app = express();

app.listen(APP_PORT, () => {
  console.log(`App started on port ${APP_PORT}.`);
});
