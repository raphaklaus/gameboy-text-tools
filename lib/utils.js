const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const findInsideBuffer = (distanceArray, buffer) => {
    let lastIndex = -1;
    let headIndex = -1;
    for (var i = 0; i < distanceArray.length; i++) {
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

module.exports = {alphabet, findInsideBuffer};