'use strict';

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const Controllers = require('./controllers/controllers.js');
const fs = require('fs');
const words = fs.readFileSync("../words", "utf-8").toLowerCase().split("\n");

const app = express();

// view engine
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', Controllers.homePage);
app.get('/end', Controllers.end);
app.post('/letter', Controllers.guessLetter);
app.post('/new-word', Controllers.newWord);
app.post('/yesButton', Controllers.yesButton);
app.post('/noButton', Controllers.noButton);

var port = process.ENV.PORT || 3000;
app.listen(port, function() {
  console.log('App listening on port 3000...');
});
