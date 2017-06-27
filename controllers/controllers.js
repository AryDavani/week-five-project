const data = require('../models/data.js')

module.exports = {
  newGame: function() {
    let randomNum = Math.floor(Math.random() * words.length);
      if (words[randomNum].length > 4 && words[randomNum].length < 11){
        newGameWord = words[randomNum];
      } else {
        return newGame();
      }
    }
  }
