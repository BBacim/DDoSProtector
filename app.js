//jshint esversion:6

// Express inisialization
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");

const port = process.env.PORT || 3000;

var routes = require('./routes');

const app = express();

app.set("view engine", "ejs");

//Get the real ip address
app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(routes);

app.listen(port, function () {
  console.log('Server started on port ', port);
});