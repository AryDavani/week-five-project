const fs = require('fs');
const data = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

module.exports = data;
