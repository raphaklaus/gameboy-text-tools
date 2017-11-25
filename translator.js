const alphabetMap = (string) => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let lowerCaseAlphabet = Array.from(alphabet);
  let upperCaseAlphabet = Array.from(alphabet.toUpperCase());

  return Array.from(string).map((char, index) => {
    if (char === ' ')
      return (0x7F).toString('16').toUpperCase();
    else if (char === '|')
      return (0x4F).toString('16').toUpperCase();
    else if (char === ';')
      return (0x55).toString('16').toUpperCase();
    else if (char === '.')
      return (0x51).toString('16').toUpperCase();
    else if (char === '!')
      return (0xE7).toString('16').toUpperCase();
    
    if (char === char.toUpperCase()) {
      return (0x80 + upperCaseAlphabet.indexOf(char)).toString('16').toUpperCase();
    } else {
      return (0xA0 + lowerCaseAlphabet.indexOf(char)).toString('16').toUpperCase();
    }
  })
};

