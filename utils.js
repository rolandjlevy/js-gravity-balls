const hexChars = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

function randomHex() {
  let hex = '';
  while (hex.length < 6) {
    const randomNum = Math.round( Math.random() * hexChars.length);
    hex += hexChars[randomNum];
  }
  return `#${hex}`;
}