document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.querySelector('#game-area');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  class Ball {
    constructor(canvas, radius, color, x, y) {
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
        if (this.velocityY < 0 && this.velocityY > -2.1) this.velocityY = 0;
        //do this otherwise ball never stops on xaxis
        if (Math.abs(this.velocityX) < 0.5) this.velocityX = 0;
        if (this.velocityX > 0) this.velocityX = this.velocityX - this.xFriction;
        if (this.velocityX < 0) this.velocityX = this.velocityX + this.xFriction;
      }
    }
  }

  const hexChars = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  function randomHex() {
    let hex = '';
    while (hex.length < 6) {
      const randomNum = Math.round( Math.random() * hexChars.length);
      hex += hexChars[randomNum];
    }
    return `#${hex}`;
  }
  
  let balls = [];
  let counter = 0;
  while (counter < 20) {
    balls.push(new Ball(
      canvas, 
      20, 
      randomHex(), 
      canvas.width / 2, 
      canvas.height / 2)
    );
    counter++;
  }

  canvas.addEventListener('click', (e) => {
    balls.push(new Ball(canvas, 20, randomHex(), e.clientX, e.clientY));
  });

  setInterval(() => {
    clearCanvas();
    balls.forEach(ball => {
      ball.draw(ctx);
      ball.movement(canvas);
    });
  }, 25);

})
