'use strict';

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const words = require('./models/data');
const Controllers = require('./controllers/controllers.js');


const app = express();

// view engine
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// variables

// let randomWord = [];
// let blankWord = [];
// let usedLetters = [];
// let letterGuessed = [];
// let attempts = [8];
//
// let context = {
//   randomWord: randomWord,
//   blankWord: blankWord,
//   attempts: attempts,
//   letterGuessed: letterGuessed,
//   usedLetters: usedLetters
// };
//
// let isAlpha = function(ch){
//   return /^[A-Z]$/i.test(ch);
// };


// writing the functions
// creating new random word

// function newWord() {
//   blankWord = [];
//   letterGuessed = [];
//   usedLetters = [];
//   let randomNum = Math.floor(Math.random() * words.length);
//     if (words[randomNum].length > 4 && words[randomNum].length < 11){
//       randomWord = words[randomNum].split('');
//       for (var i = 0; i < randomWord.length; i++) {
//         blankWord.push('_');
//         context.blankWord = blankWord;
//       }
//     } else {
//       return newWord();
//     } return blankWord;
//   }


  // function guessLetter() {
  //   // is it a single alphabet letter
  //   //
  //   // if it's correct, add it to the dom
  //   // if it's wrong and you have no remaining guesses - you lose
  //   // if it's wrong and you have remaining guesess, update # of guesses remaining & add to guesses
  //
  //   if (!isAlpha(letterGuessed)) {
  //   } else if (letterGuessed.length !== 1) {
  //   } else if (attempts === 0) {
  //   }
  //
  //   for (var i = 0; i < usedLetters.length; i++) {
  //     if (usedLetters[i] == letterGuessed){
  //       // "You already guess that letter"
  //     }
  //
  //
  //
  //   usedLetters.push(letterGuessed);
  //   context.usedLetters = usedLetters;
  //   context.letterGuessed = letterGuessed;
  //
  //   if (letterGuessed.length < 2 && letterGuessed.length > 0){
  //     for (var i = 0; i < randomWord.length; i++) {
  //       if (letterGuessed.toLowerCase() === randomWord[i]){
  //         blankWord.splice(i, 1, letterGuessed);
  //         context.blankWord = blankWord;
  //       }
  //     }
  //   }
  // }

// requests that will move to routes.js

app.get('/', Controllers.homePage);
app.post('/letter', Controllers.guessLetter);
app.post('/new-word', Controllers.newWord);


app.listen(3000, function() {
  console.log('App listening on port 3000...');
});
