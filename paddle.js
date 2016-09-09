function Paddle(canvas) {
  this.paddleWidth = 75;
  this.paddleHeight = 10;
  this.paddleColor = "#0095DD";
  this.paddleX = (canvas.width - this.paddleWidth) / 2;
  this.rightPressed = false;
  this.leftPressed = false;
  let ctx = canvas.getContext("2d");

  this.drawPaddle = function() {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight,
      this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = this.paddleColor;
    ctx.fill();
    ctx.closePath();
  };

  this.keyDownHandler = function(e) {
    if (e.keyCode === 39) {
      this.rightPressed = true;
    }
    else if (e.keyCode === 37) {
      this.leftPressed = true;
    }
  };

  this.keyUpHandler = function(e) {
    if(e.keyCode === 39) {
      this.rightPressed = false;
    }
    else if(e.keyCode === 37) {
      this.leftPressed = false;
    }
  };

  this.mouseMoveHandler = function(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  };

  this.updatePaddle = function() {
    if (this.rightPressed && this.paddleX < canvas.width - this.paddleWidth) {
      this.paddleX += 7;
    }
    else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }
  };

}

module.exports = Paddle;
