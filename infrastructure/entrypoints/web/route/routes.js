const express = require('express');
const app = express();

app.use(require('./user/user.js'));

module.exports = app;