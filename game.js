const Ball = require('./ball');
const Paddle = require('./paddle');
const Bricks = require('./bricks');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ball = new Ball(canvas);
var paddle = new Paddle(canvas);
var bricks = new Bricks(canvas);
var score = 0;
var lives = 3;

document.addEventListener("keydown", paddle.keyDownHandler.bind(paddle), false);
document.addEventListener("keyup", paddle.keyUpHandler.bind(paddle), false);
document.addEventListener("mousemove", paddle.mouseMoveHandler.bind(paddle), false);

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives:" + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.drawBall();
  paddle.drawPaddle();
  bricks.drawBricks();
  drawScore();
  drawLives();

  ball.bounceOffWall();
  ball.bounceOffPaddle(paddle);
  lives = ball.ballFalls(lives, paddle);

  score = bricks.collisionDetection(ball, score);

  paddle.updatePaddle();

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}

draw();
