const fs = require('fs'),
  utils = require('./lib/utils.js');

let args = process.argv.slice(2, 4);
let romPath = args[0];
let text = args[1];

fs.readFile(romPath, (error, data) => {
  let array = new Uint8Array(data);
  let sentenceArray = buildSentence(text);
  let distance = calculateDistance(sentenceArray);
  let foundByteRoot, foundHexSentence;

  if ([...Array(0xff).keys()].some(byte => {
    let hexSentence = createHexSentence(distance, byte);
    let result = utils.findInsideBuffer(hexSentence, array) >= 0;
    if (result) {
      console.log('Found!')
      foundHexSentence = hexSentence
      foundByteRoot = byte;
    }

    return result;
  })) {
    if (foundHexSentence) {
      console.log('hexSentence:', foundHexSentence.map(byte => ('00' + Number(byte).toString(16)).substr(-2).toUpperCase()).join(' '))
      console.log(`Byte for ${isUpperCase(text[0]) ? 'A' : 'a'}:`, getAByte(text, foundHexSentence).toString(16));
    }
  }
  else {
    console.log('not found');
  }
});

const buildSentence = sentence  => {
  return Array.from(sentence).map((char) => ('00' + char.charCodeAt(0).toString('16')).substr(-2));
};

const calculateDistance = sentenceArray => {
  return sentenceArray.map((char) => parseInt(sentenceArray[0], 16) - parseInt(char, 16));
};

const createHexSentence = (distance, root) => {
  return distance.map(byte => root - byte);
};

const getAByte = (text, hexSentence) => {
  let letterIndex;
  if (isUpperCase(text[0])) {
    letterIndex = utils.alphabet.toUpperCase().indexOf(text[0]);
    return (hexSentence[0] - letterIndex).toString(16).toUpperCase();
  }

  letterIndex = utils.alphabet.indexOf(text[0]);
  return (hexSentence[0] - letterIndex).toString(16).toUpperCase();
};

const isUpperCase = char => char === char.toUpperCase();