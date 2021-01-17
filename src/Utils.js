export class Utils {
  constructor() {
  }
  hexChars() {
    const base = 16;
    const arr = [];
    let char = base;
    while (--char >= 0) {
      const str = char.toString(base);
      arr.push(str);
    }
    return arr;
  }
  randomNum(n) {
    return Math.round(Math.random() * n);
  }
  randomHex() {
    let hex = '';
    while (hex.length < 6) {
      const num = this.randomNum(this.hexChars().length);
      hex += this.hexChars()[num];
    }
    return `#${hex}`;
  }
  $(selector) {
    return document.querySelector(selector);
  }
}