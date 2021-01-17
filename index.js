import { Ball } from './src/Ball.js';
import { Input } from './src/Input.js';
import { Utils } from './src/Utils.js';

const utils = new Utils();

const canvas = utils.$('#game-area');
canvas.width = 400;
canvas.height = 300;
canvas.style.opacity = 1;
const ctx = canvas.getContext('2d');

function drawClickMeText() {
  ctx.font = "1.25rem sans-serif";
  ctx.fillStyle = "#e0e0e0";
  ctx.textAlign = "center";
  ctx.fillText("Click me!", canvas.width/2, canvas.height/2 + 10);
}

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
  if (balls.length < 1) {
    init = false;
    drawClickMeText();
  } else {
    requestAnimationFrame(gameLoop);
  }
  // $('.count').innerHTML = `ball count: ${balls.length}`;
}

let init = false;
drawClickMeText();

canvas.addEventListener('mousedown', (e) => {
  if (!init) {
    requestAnimationFrame(gameLoop);
    init = true;
  }
});
