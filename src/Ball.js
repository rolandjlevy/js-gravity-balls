class Ball {
  constructor(radius, color, x, y) {
    this.x = x,
    this.y = y,
    this.radius = radius;
    this.color = color;
    this.gravity = 0.5;
    this.bounce = 0.7;
    this.xFriction = 0.2;
    this.velocityX = (Math.random() * 10) - 5;
    this.velocityY = (Math.random() * 5) - 10;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.closePath();
  }
  movement(canvas) {
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
      //bounce the ball
      this.velocityY *= -this.bounce;
      //do this otherwise, ball never stops bouncing
      if (this.velocityY < 0 && this.velocityY > -2.3) this.velocityY = 0;
      // if (this.velocityY != 0) console.log({vy: this.velocityY})
      //do this otherwise ball never stops on xaxis
      if (Math.abs(this.velocityX) < 0.5) this.velocityX = 0;
      if (this.velocityX > 0) this.velocityX = this.velocityX - this.xFriction;
      if (this.velocityX < 0) this.velocityX = this.velocityX + this.xFriction;
    }
  }
}