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

let randomWord = [];
let blankWord = [];
let letterGuessed;
let context = {
  randomWord: randomWord,
  blankWord: blankWord
};

function newWord() {
  blankWord = [];
  let randomNum = Math.floor(Math.random() * words.length);
    if (words[randomNum].length > 4 && words[randomNum].length < 11){
      randomWord = words[randomNum].split('');
      for (var i = 0; i < randomWord.length; i++) {
        blankWord.push('_');
      }
    } else {
      return newWord();

    } return blankWord;
  }

  function guessLetter() {
    if (letterGuessed.length < 2){
      console.log('valid');
    } else {
      console.log('invalid letter');
    }
  }


app.get('/', function(req, res) {
  res.render('index', {blankWord});
});

app.post('/letter', function(req, res) {
  letterGuessed = req.body.letter;
  guessLetter();
  res.redirect('/');
});

app.post('/new-word', function(req, res) {
  newWord();
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('App listening on port 3000...');
});
