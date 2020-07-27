const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const randomNum = n => Math.round( Math.random() * n);

function randomHex() {
  let hex = '';
  while (hex.length < 6) {
    const num = randomNum(hexChars.length);
    hex += hexChars[num];
  }
  return `#${hex}`;
}
