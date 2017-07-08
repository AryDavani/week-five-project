const words = require('../models/data.js');
const session = require('express-session');
const path = require('path');


let randomWord = [];
let blankWord = [];
let usedLetters = [];
let letterGuessed = [];
let attempts = 8;

let context = {
  randomWord: randomWord,
  blankWord: blankWord,
  attempts: attempts,
  letterGuessed: letterGuessed,
  usedLetters: usedLetters
};

let endMsg;

let isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
};

function randomPick() {
  let randomNum = Math.floor(Math.random() * words.length);
    if (words[randomNum].length > 4 && words[randomNum].length < 11){
      randomWord = words[randomNum].split('');
      for (var i = 0; i < randomWord.length; i++) {
        blankWord.push('_');
        context.blankWord = blankWord;
      }
    } else {
      return randomPick();
    } return blankWord;
}

module.exports = {
  newWord: function(req, res) {
    blankWord = [];
    letterGuessed = [];
    randomPick();
      res.redirect('/');
    },

    guessLetter: function(req, res) {
      letterGuessed = req.body.letter;
      console.log(letterGuessed);
      // is it a single alphabet letter
      //
      // if it's correct, add it to the dom
      // if it's wrong and you have no remaining guesses - you lose
      // if it's wrong and you have remaining guesess, update # of guesses remaining & add to guesses

      if (!isAlpha(letterGuessed)) {
      } else if (letterGuessed.length !== 1) {
      } else if (attempts === 0) {
      }

      for (var i = 0; i < usedLetters.length; i++) {
        if (usedLetters[i] == letterGuessed){
          // "You already guess that letter"
        }
      usedLetters.push(letterGuessed);
      context.usedLetters = usedLetters;
      context.letterGuessed = letterGuessed;

      if (letterGuessed.length < 2 && letterGuessed.length > 0){
        for (var i = 0; i < randomWord.length; i++) {
          if (letterGuessed.toLowerCase() === randomWord[i]){
            blankWord.splice(i, 1, letterGuessed);
            context.blankWord = blankWord;
          }
        }
      }
    }
    res.redirect('/');
  },

  homePage: function(req, res) {
    res.render('index', context);
  }


}
