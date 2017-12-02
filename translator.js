const { alphabet } = require('./lib/utils.js');

const alphabetMap = (string, lowerCaseAByte, upperCaseAByte) => {
  let lowerCaseAlphabet = Array.from(alphabet);
  let upperCaseAlphabet = Array.from(alphabet.toUpperCase());

  return Array.from(string).map((char, index) => {
    if (char === ' ')
      return ('00' + (0xEF).toString('16')).substr(-2).toUpperCase();
    else if (char === '|')
      return ('00' + (0x05).toString('16')).substr(-2).toUpperCase();
    else if (char === ';')
      return ('00' + (0x55).toString('16')).substr(-2).toUpperCase();
    else if (char === '.')
      return ('00' + (0x51).toString('16')).substr(-2).toUpperCase();
    else if (char === '!')
      return ('00' + (0xDE).toString('16')).substr(-2).toUpperCase();
    
    if (char === char.toUpperCase()) {
      return (upperCaseAByte + upperCaseAlphabet.indexOf(char)).toString('16').toUpperCase();
    } else {
      return (lowerCaseAByte + lowerCaseAlphabet.indexOf(char)).toString('16').toUpperCase();
    }
  })
};

let args = process.argv.slice(2, 5);
console.log(alphabetMap(args[0], parseInt(args[1], 16), parseInt(args[2], 16)).join(' '));