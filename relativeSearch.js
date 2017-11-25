const fs = require('fs');

fs.readFile('./roms/PokemonRed.gb', (error, data) => {
  let array = new Uint8Array(data);
  let sentenceArray = buildSentence('elcome');
  let distance = calculateDistance(sentenceArray);
  let foundByteRoot, foundHexSentence;
  if ([...Array(0xff).keys()].some(byte => {
    let hexSentence = createHexSentence(distance, byte);
    let result = findInsideBuffer(hexSentence, array) >= 0;
    if (result) {
      console.log('Found!')
      foundHexSentence = hexSentence
      foundByteRoot = byte;
    }

    return result;
  })) {
    if (foundHexSentence) {
      console.log('hexSentence:', foundHexSentence.map(byte => Number(byte).toString(16).toUpperCase()).join(' '))
      console.log('byte root:', foundByteRoot);
    }
  }
  else {
    console.log('not found');
  }
});

const buildSentence = sentence  => {
  return Array.from(sentence).map((char) => char.charCodeAt(0).toString('16'));
};

const calculateDistance = sentenceArray => {
  return sentenceArray.map((char) => parseInt(sentenceArray[0], 16) - parseInt(char, 16));
};

const createHexSentence = (distance, root) => {
  return distance.map(byte => root - byte);
};

const findInsideBuffer = (distanceArray, buffer) => {
  let lastIndex = -1;
  let headIndex = -1;
  for (var i=0; i<distanceArray.length;i++) {
    if (i === 0) {
      lastIndex = buffer.indexOf(distanceArray[i], lastIndex >= 0 ? lastIndex : 0);
      if (lastIndex >= 0) {
        headIndex = lastIndex;
        lastIndex++;
      } else {
        break;
      }
    }
    else {
      if (buffer[lastIndex] === distanceArray[i]) {
        lastIndex++;
      }
      else {
        headIndex = -1;
        i = -1;
      }
    }
  }

  return headIndex;
};