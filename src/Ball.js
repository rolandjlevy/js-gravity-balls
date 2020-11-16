export class Ball {
  constructor({ctx, radius, colour, x, y, id}) {
    this.ctx = ctx;
    this.radius = radius;
    this.colour = colour;
    this.x = x,
    this.y = y,
    this.id = id;
    this.gravity = 0.5;
    this.bounce = 0.7;
    this.xFriction = 0.2;
    this.velocityX = (Math.random() * 10) - 5;
    this.velocityY = (Math.random() * 5) - 10;
    this.alive = true;
    this.ctx.globalAlpha = 0.7;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.colour;
    this.ctx.fill();
    this.ctx.closePath();
  }
  delay(t){
    return new Promise(resolve => setTimeout(resolve, t));
  }
  fade(){
    let opacity = 0.7;
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (opacity > 0) {
          this.ctx.globalAlpha = opacity >= 0 ? opacity : 0;
          opacity -= 0.005;
        } 
        if (opacity < 0.005) {
          this.alive = false;
          clearInterval(timer);
          console.log({opacity}, this.alive)
          resolve();
        }
      }, 1);
    });
  }
  async movement(canvas) {
    if (!this.alive) {
      return;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    // change x direction when ball hits wall
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocityX *= -1;
    }

    // Ball hits the floor
    if (this.y + this.radius > canvas.height) { 
      // Re-positioning on the base
      this.y = canvas.height - this.radius;
      this.velocityY *= -this.bounce;
      // do this otherwise, ball never stops bouncing
      if (this.velocityY < 0 && this.velocityY > -2.3) {
        this.velocityY = 0;
      }
      // do this otherwise ball never stops on xaxis
      if (Math.abs(this.velocityX) <= 0.5) {
        this.velocityX = 0;
      }
      if (Math.abs(this.velocityY) <= 0.5) {
        this.velocityY = 0;
      }
      if (this.alive && Math.abs(this.velocityX) <= 0.005 && Math.abs(this.velocityY) <= 0.005) {
        // do fade here
        // await this.fade();
        this.alive = false;
      }
      if (this.velocityX > 0) this.velocityX = this.velocityX - this.xFriction;
      if (this.velocityX < 0) this.velocityX = this.velocityX + this.xFriction;
    }
  }
}