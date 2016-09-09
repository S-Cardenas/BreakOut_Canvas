function Ball(canvas) {
  this.x = canvas.width / 2;
  this.y = canvas.height - 30;
  this.dx = 2;
  this.dy = -2;
  this.ballRadius = 10;
  this.ballColor = "#0095DD";
  let ctx = canvas.getContext("2d");

  this.drawBall = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
  };

  this.bounceOffWall = function() {
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius ) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    }
  };

  this.bounceOffPaddle = function(paddle) {
    if (this.y + this.dy > canvas.height - this.ballRadius) {
      if (this.x > paddle.paddleX && this.x < paddle.paddleX + paddle.paddleWidth) {
        this.dy = -this.dy;
        paddle.paddleColor = 'yellow';
        setTimeout(function(){paddle.paddleColor = "#0095DD";}, 100);
      }
    }
  };

  this.ballFalls = function(lives, paddle) {
    if (this.y + this.dy > canvas.height - this.ballRadius) {
      if (!lives) {
        alert("Game Over");
        document.location.reload();
      }
      else {
        lives -= 1;
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
        return lives;
      }
    }
    return lives;
  };
}

module.exports = Ball;
