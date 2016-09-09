function Bricks(canvas) {
  this.allBricks = [];
  this.brickRowCount = 3;
  this.brickColumnCount = 5;
  this.brickWidth= 75;
  this.brickHeight = 20;
  this.brickPadding = 10;
  this.brickOffsetTop = 30;
  this.brickOffsetLeft = 30;
  let ctx = canvas.getContext("2d");

  for (let c = 0; c < this.brickColumnCount; c++) {
    this.allBricks[c] = [];
    for (let r = 0; r < this.brickRowCount; r++) {
      this.allBricks[c][r] = {x: 0, y: 0, status: 1};
    }
  }

  this.drawBricks = function() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.allBricks[c][r].status === 1) {
          var brickX = (c*(this.brickWidth + this.brickPadding) + this.brickOffsetLeft);
          var brickY = (r*(this.brickHeight + this.brickPadding) + this.brickOffsetTop);
          this.allBricks[c][r].x = brickX;
          this.allBricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  this.collisionDetection = function(ball, score) {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        var b = this.allBricks[c][r];
        if (b.status === 1) {
          if (ball.x > b.x && ball.x < b.x + this.brickWidth && ball.y > b.y && ball.y < b.y + this.brickHeight) {
            ball.dy = -ball.dy;
            b.status = 0;
            score++;
            ball.ballColor = 'yellow';
            setTimeout(function(){ball.ballColor = '#0095DD';}, 100);
            if (score === this.brickRowCount * this.brickColumnCount) {
              alert("YOU WIN!!");
              document.location.reload();
            }
            else {
              return score;
            }
          }
        }
      }
    }
    return score;
  };

}

module.exports = Bricks;
