require('./config/config.js')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('../infrastructure/entrypoints/web/route/routes.js'));

//mongoose.connect(process.env.URL_DATABASE, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    useCreateIndex: true
//});

//mongoose.connection.once("open", async() => {
//    console.log("Connected to database");
//});

//mongoose.connection.on("error", (err) => {
//    console.log("Error connecting to database  ", err);
//});

var connectWithRetry = function() {
    return mongoose.connect(process.env.URL_DATABASE, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                setTimeout(connectWithRetry, 5000);
            }
        });
};
connectWithRetry();

app.listen(process.env.PORT, () => {
    console.log("Escuchando en: ", process.env.PORT);
});

module.exports = app;