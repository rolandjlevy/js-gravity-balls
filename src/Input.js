export class Input {
  constructor(canvas, utils) {
    this.utils = utils;
    const mouse = this.getEventTypes();
    canvas.addEventListener(mouse.down, (e) => {
      this.pressing = true;
      this.e = e;
    });
    canvas.addEventListener(mouse.up, (e) => {
      this.pressing = false;
    });
    [mouse.down, mouse.move].forEach(event => {
      canvas.addEventListener(event, (e) => {
        if (this.pressing) {
          this.e = e;
        }      
      });
    });
  }
  getEventTypes() {
    const docElem = document.documentElement;
    return {
      down: 'ontouchstart' in docElem ? 'touchstart' : 'mousedown',
      up: 'ontouchend' in docElem ? 'touchend' : 'mouseup',
      move: 'ontouchmove' in docElem ? 'touchmove' : 'mousemove'
    }
  }
  press({ctx, Ball, balls, maxRadius}) {
    if (this.pressing && this.e) {
      const rect = this.e.target.getBoundingClientRect();
      const eventType = this.e.touches ? this.e.touches[0] : this.e;
      const ball = new Ball({
        ctx,
        radius:this.utils.randomNum(maxRadius), 
        colour:this.utils.randomHex(), 
        x:eventType.clientX - rect.left, 
        y:eventType.clientY - rect.top,
        id:new Date().getTime()
      });
      balls.push(ball);
    }
  }
}