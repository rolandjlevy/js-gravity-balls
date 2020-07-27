class Input {
  constructor(canvas) {
    ['mousedown', 'touchstart'].forEach(event => {
      canvas.addEventListener(event, (e) => {
        this.pressing = true;
        this.e = e;
      });
    });
    ['mouseup', 'touchend'].forEach(event => {
      canvas.addEventListener(event, (e) => {
        this.pressing = false;
      });
    });
    ['mousedown', 'mousemove', 'touchstart', 'touchmove'].forEach(event => {
      canvas.addEventListener(event, (e) => {
        if (this.pressing) {
          this.e = e;
        }      
      });
    });
  }
  press(balls) {
    if (this.pressing && this.e) {
      const rect = this.e.target.getBoundingClientRect();
      const eventType = this.e.touches ? this.e.touches[0] : this.e;
      const mouseX = eventType.clientX - rect.left;
      const mouseY = eventType.clientY - rect.top;
      const radius = randomNum(20);
      balls.push(new Ball(radius, randomHex(), mouseX, mouseY));
    }
  }
}