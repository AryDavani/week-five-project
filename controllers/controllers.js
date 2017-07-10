const words = require('../models/data.js');
const session = require('express-session');
const path = require('path');


let randomWord = [];
let blankWord = [];
let usedLetters = [];
let letterGuessed = [];
let attempts = 8;
let letterDuplicate = false;
let validLetter = true;
let letterIsWithin = false;
let endMessage = 'Ouch, you lose!';

let context = {
  blankWord: blankWord,
  attempts: attempts,
  usedLetters: usedLetters,
  message: '',
};

let isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
};

function randomPick() {
  let randomNum = Math.floor(Math.random() * words.length);
    if (words[randomNum].length > 3 && words[randomNum].length < 11){
      randomWord = words[randomNum].split('');
      for (var i = 0; i < randomWord.length; i++) {
        blankWord.push('_');
        context.blankWord = blankWord;
      }
    } else {
      return randomPick();
    } return blankWord;
};

function endScreen(req, res) {
  res.redirect('/end');
};

module.exports = {
  newWord: function(req, res) {
    blankWord = [];
    letterGuessed = [];
    usedLetters = [];
    randomPick();
      res.redirect('/');
    },

    guessLetter: function(req, res) {
      context.message = '';
      letterGuessed = req.body.letter;
      console.log(letterGuessed);

      if (attempts === 0) {
        // go to game over screen
        endScreen();
      };

      if (!isAlpha(letterGuessed) && letterGuessed.length !== 1) {
        context.message = 'try using a single letter';
        validLetter = false;
      };

      for (var i = 0; i < usedLetters.length; i++) {
        if (letterGuessed == usedLetters[i]){
          letterDuplicate = true;
          context.message = 'You already guessed that letter';
        };
      };

      if (validLetter === true && letterDuplicate === false){
        usedLetters.push(letterGuessed);
        context.usedLetters = usedLetters;

        for (var i = 0; i < randomWord.length; i++) {
          if (letterGuessed.toLowerCase() === randomWord[i]){
            blankWord.splice(i, 1, letterGuessed);
            context.blankWord = blankWord;
            letterIsWithin = true;
            };
          };
        };

      if (!letterIsWithin && !letterDuplicate) {
        attempts = attempts - 1;
        context.attempts = attempts;
      };

      if (blankWord === randomWord) {
        endMessage = 'Hooray, you win!';
      };

    res.redirect('/');
  },

  homePage: function(req, res) {
    endMessage = 'Ouch, you lose!';
    letterDuplicate = false;
    validLetter = true;
    letterIsWithin = false;
    res.render('index', context);
  },

  end: function(req, res) {
    res.render('endGame', {endMessage});
  },

  yesButton: function(req, res) {
    res.redirect('/');
  },

  noButton: function(req, res) {
    res.render('noMoreGames');
  }


}
