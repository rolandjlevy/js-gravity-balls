const hexChars = () => {
  const base = 16;
  const arr = [];
  let char = base;
  while (--char >= 0) {
    const str = char.toString(base);
    arr.push(str);
  }
  return arr;
}

const randomNum = n => Math.round(Math.random() * n);

const randomHex = () => {
  let hex = '';
  while (hex.length < 6) {
    const num = randomNum(hexChars().length);
    hex += hexChars()[num];
  }
  return `#${hex}`;
}

const $ = (selector) => document.querySelector(selector);