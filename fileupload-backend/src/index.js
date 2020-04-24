const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');

const {APP_PORT} = require('./constants');
const {MONGODB_CONNECTION_STRING} = require('./constants');


const {localStrategy, jwtStrategy} = require('./auth/strategies');
const app = express();

mongoose.connect(MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB.');
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', routes);

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());


app.listen(APP_PORT, () => {
    console.log(`App started on port ${APP_PORT}.`);
});
