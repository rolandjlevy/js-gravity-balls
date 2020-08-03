document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.querySelector('#game-area');
  canvas.width = 400;
  canvas.height = 300;
  canvas.style.opacity = 1;
  const ctx = canvas.getContext('2d');

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  const count = document.querySelector('.count');

  const events = new Input(canvas);

  const balls = [];

  function gameLoop() {
    clearCanvas();
    balls.forEach(ball => {
      ball.draw(ctx);
      ball.movement(canvas);
    });
    events.press(balls);
    count.innerHTML = balls.length;
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

});