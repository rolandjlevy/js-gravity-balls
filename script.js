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