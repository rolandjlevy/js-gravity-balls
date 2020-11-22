import { Ball } from './src/Ball.js';
import { Input } from './src/Input.js';

const canvas = $('#game-area');
canvas.width = 400;
canvas.height = 300;
canvas.style.opacity = 1;
const ctx = canvas.getContext('2d');

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const events = new Input(canvas);

let balls = [];

function gameLoop() {
  clearCanvas();
  balls.forEach(ball => {
    ball.draw();
    ball.movement(canvas);
  });
  balls = balls.filter(item => item.alive);
  events.press({ctx, Ball, balls, maxRadius:20});
  // $('.count').innerHTML = `ball count: ${balls.length}`;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);