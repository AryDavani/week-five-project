const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

module.export = words;
