'use strict';

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// const Controllers = require('./controllers/controllers.js');

const app = express();

// view engine
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

//variables that will all move to controllers.js

let randomWord = [];
let blankWord = [];
let usedLetters = [];
let letterGuessed = [];
let attempts;

let context = {
  randomWord: randomWord,
  blankWord: blankWord,
  attempts: attempts,
  letterGuessed: letterGuessed,
  usedLetters: usedLetters
};

// writing the functions here before I move them to controllers.js

//creating new random word
function newWord() {
  attempts = 8;
  blankWord = [];
  letterGuessed = [];
  let randomNum = Math.floor(Math.random() * words.length);
    if (words[randomNum].length > 4 && words[randomNum].length < 11){
      randomWord = words[randomNum].split('');
      for (var i = 0; i < randomWord.length; i++) {
        blankWord.push('_');
        context.blankWord = blankWord;
      }
    } else {
      return newWord();
    } return blankWord;
  }


  function guessLetter() {
    usedLetters.push(letterGuessed);
    context.usedLetters = usedLetters;
    context.letterGuessed = letterGuessed;
    attempts = attempts - 1;
    context.attempts = attempts;
    if (letterGuessed.length < 2 && letterGuessed.length > 0){
      for (var i = 0; i < randomWord.length; i++) {
        if (letterGuessed.toLowerCase() === randomWord[i]){
          blankWord.splice(i, 1, letterGuessed);
          context.blankWord = blankWord;
        } else {
        }
      }
    }
    if (attempts < 1) {
    }
  }

// requests that will move to routes.js

app.get('/', function(req, res) {
  console.log(context.blankWord);
  res.render('index', context);
});

app.post('/letter', function(req, res) {
  letterGuessed = req.body.letter;
  guessLetter();
  res.redirect('/');
});

app.post('/new-word', function(req, res) {
  newWord();
  console.log(randomWord);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('App listening on port 3000...');
});
