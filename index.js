document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.querySelector('#game-area');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  let balls = [];
  let counter = 0;
  while (counter++ < 20) {
    balls.push(new Ball(
      canvas, 
      20, 
      randomHex(), 
      canvas.width / 2, 
      canvas.height / 2)
    );
  }

  ['mousedown', 'touchstart'].forEach(event => {
    canvas.addEventListener(event, (e) => {
      const rect = e.target.getBoundingClientRect();
      const eventType = e.touches ? e.touches[0] : e;
      const mouseX = eventType.clientX - rect.left;
      const mouseY = eventType.clientY - rect.top;
      // const rect = canvas.getBoundingClientRect();
      // const x = e.clientX - rect.left;
      // const y = e.clientY - rect.top;
      balls.push(new Ball(canvas, 20, randomHex(), mouseX, mouseY));
    });
  })

  function gameLoop() {
    clearCanvas();
    balls.forEach(ball => {
      ball.draw(ctx);
      ball.movement(canvas);
    });
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

})
