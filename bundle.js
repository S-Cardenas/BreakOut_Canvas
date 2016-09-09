/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(1);
	const Paddle = __webpack_require__(2);
	const Bricks = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);