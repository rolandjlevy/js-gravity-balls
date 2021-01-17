import { Ball } from './src/Ball.js';
import { Input } from './src/Input.js';
import { Utils } from './src/Utils.js';


const utils = new Utils();

const canvas = utils.$('#game-area');
canvas.width = 400;
canvas.height = 300;
canvas.style.opacity = 1;
const ctx = canvas.getContext('2d');

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const events = new Input(canvas, utils);

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