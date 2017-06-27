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
let context = {
  randomWord: randomWord,
  blankWord: blankWord
};

function newGame() {
  let randomNum = Math.floor(Math.random() * words.length);

    if (words[randomNum].length > 4 && words[randomNum].length < 11){
      randomWord = words[randomNum].split('');
      for (var i = 0; i < randomWord.length; i++) {
        blankWord.push('_');
      }
    } else {
      return newGame();
    }

  }
console.log(randomWord);
console.log(blankWord);


app.get('/', function(req, res) {
  res.render('index', {context});
});

app.post('/', function(req, res) {
  let letterGuessed = req.body.letter;
  res.redirect('/');
});

app.post('/new-word', function(req, res) {
  newGame();
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('App listening on port 3000...');
});
