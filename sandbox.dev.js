"use strict";

var _Fruit = _interopRequireDefault(require("./assets/classes/Fruit.js"));

var _SnakeBodyPart = _interopRequireDefault(require("./assets/classes/SnakeBodyPart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// variables.
var head = document.querySelector(".circle");
var gameBox = document.querySelector(".screen");
var startButton = document.querySelector(".start");
var restartButton = document.querySelector(".restart");
var gameScore = document.querySelector(".scoreboard");
var snakePic = document.querySelector(".snake-head");
var gameIsRunning = false;
var gameIsStarting = false;
var upCheck = true;
var downCheck = false;
var rightCheck = false;
var leftCheck = false;
var score = 0;
var snack = new _Fruit["default"](0, 0);
var snakeBodyArr = [];
var bodyCount = 0;
var count;
var previousPartMovement = "up"; // functions.

var countdownStart = function countdownStart() {
  score = 0;
  gameScore.innerHTML = "Score: ".concat(score);
  count = 3;
  document.querySelector(".game-info").style.opacity = "0.8";
  gameIsStarting = true;
  gameStart();
  restartButton.style.display = "none";
  fruitGenerator();
};

var gameStart = function gameStart() {
  if (gameIsStarting) {
    var gameTest = document.querySelector(".game-info");

    if (count === 3) {
      count--;
      gameTest.style.opacity = "0.8";
      gameTest.innerHTML = "3";
      setTimeout(gameStart, 1000);
    } else if (count === 2) {
      count--;
      gameTest.innerHTML = "2";
      setTimeout(gameStart, 1000);
    } else if (count === 1) {
      count--;
      gameTest.innerHTML = "1";
      setTimeout(gameStart, 1000);
    } else {
      gameTest.style.opacity = "0";
      gameTest.innerHTML = "";
      gameIsRunning = true;
    }
  }
};

var gameRunning = function gameRunning() {
  movementFunction();
  fruitGrabbingChecker();
  checkGameStatus();
};

var movementFunction = function movementFunction() {
  if (gameIsRunning) {
    primaryCheck();

    if (snakeBodyArr.length > 0) {
      var headPosition = head.getBoundingClientRect();
      var previousBodyPart = 0;

      for (var i = 0; i < snakeBodyArr.length; i++) {
        var snakeBodyPart = snakeBodyArr[i];
        var snakeHTML = document.querySelector(".snake-body-part-".concat(i));

        if (i === 0) {
          if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos <= headPosition.top + 31 && previousPartMovement == "up") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos > headPosition.top + 31 && previousPartMovement == "up") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos > headPosition.left && snakeBodyPart.yPos == headPosition.top && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos < headPosition.left && snakeBodyPart.yPos == headPosition.top && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos >= headPosition.top - 31 && previousPartMovement == "down") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos < headPosition.top - 31 && previousPartMovement == "down") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos >= headPosition.left + 31 && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "left") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos < headPosition.left + 31 && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "left") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos > headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos < headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos > headPosition.left - 31 && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "right") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos <= headPosition.left + 31 && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "right") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos < headPosition.left && (snakeBodyPart.yPos < headPosition.top || snakeBodyPart.yPos > headPosition.top) && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos > headPosition.left && (snakeBodyPart.yPos < headPosition.top || snakeBodyPart.yPos > headPosition.top) && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if ((snakeBodyPart.xPos < headPosition.left || snakeBodyPart.xPos > headPosition.left) && snakeBodyPart.yPos < headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if ((snakeBodyPart.xPos < headPosition.left || snakeBodyPart.xPos > headPosition.left) && snakeBodyPart.yPos > headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          }
        } else {
          if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos <= previousBodyPart.yPos && previousPartMovement == "up") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos > previousBodyPart.yPos && previousPartMovement == "up") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos > previousBodyPart.xPos && snakeBodyPart.yPos == previousBodyPart.yPos && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos < previousBodyPart.xPos && snakeBodyPart.yPos == previousBodyPart.yPos && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos >= previousBodyPart.yPos - 31 && previousPartMovement == "down") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos < previousBodyPart.yPos - 31 && previousPartMovement == "down") {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos >= previousBodyPart.xPos + 31 && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "left") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos < previousBodyPart.xPos + 31 && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "left") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos > previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos < previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if (snakeBodyPart.xPos > previousBodyPart.xPos - 31 && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "right") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if (snakeBodyPart.xPos <= previousBodyPart.xPos + 31 && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "right") {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos < previousBodyPart.xPos && (snakeBodyPart.yPos < previousBodyPart.yPos || snakeBodyPart.yPos > previousBodyPart.yPos) && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "right";
          } else if (snakeBodyPart.xPos > previousBodyPart.xPos && (snakeBodyPart.yPos < previousBodyPart.yPos || snakeBodyPart.yPos > previousBodyPart.yPos) && (previousPartMovement == "up" || previousPartMovement == "down")) {
            snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
            snakeHTML.style.left = "".concat(snakeBodyPart.xPos);
            previousPartMovement = "left";
          } else if ((snakeBodyPart.xPos < previousBodyPart.xPos || snakeBodyPart.xPos > previousBodyPart.xPos) && snakeBodyPart.yPos < previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "down";
          } else if ((snakeBodyPart.xPos < previousBodyPart.xPos || snakeBodyPart.xPos > previousBodyPart.xPos) && snakeBodyPart.yPos > previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
            snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
            snakeHTML.style.top = "".concat(snakeBodyPart.yPos);
            previousPartMovement = "up";
          }

          checkSepukuStatus(headPosition, snakeBodyArr);
        }

        previousBodyPart = snakeBodyPart;
      }
    }
  }
};

var primaryCheck = function primaryCheck() {
  previousPartMovement;
  var headPosition = head.getBoundingClientRect();

  if (upCheck) {
    var headUp = headPosition.top - 1 + "px";
    head.style.top = headUp;
    snakePic.style.transform = "rotate(-90deg)";
    previousPartMovement = "up";
  } else if (leftCheck) {
    var headLeft = headPosition.left - 1 + "px";
    head.style.left = headLeft;
    snakePic.style.transform = "rotate(-180deg)";
    previousPartMovement = "left";
  } else if (rightCheck) {
    var headRight = headPosition.left + 1 + "px";
    head.style.left = headRight;
    snakePic.style.transform = "rotate(0deg)";
    previousPartMovement = "right";
  } else if (downCheck) {
    var headDown = headPosition.top + 1 + "px";
    head.style.top = headDown;
    snakePic.style.transform = "rotate(90deg)";
    previousPartMovement = "down";
  }

  return previousPartMovement;
};

var checkSepukuStatus = function checkSepukuStatus(snakeHead, snakeArr) {
  for (var i = 1; i < snakeArr.length; i++) {
    var snakeBody = snakeArr[i];

    if (snakeBody.xPos + 30 >= snakeHead.left && snakeBody.xPos + 30 < snakeHead.right && snakeBody.xPos < snakeHead.left && snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos <= snakeHead.bottom || snakeBody.xPos <= snakeHead.right && snakeBody.xPos > snakeHead.left && snakeBody.xPos + 30 > snakeHead.right && snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos <= snakeHead.bottom || snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos + 30 < snakeHead.bottom && snakeBody.yPos < snakeHead.top && snakeBody.xPos <= snakeHead.left && snakeBody.xPos + 30 >= snakeHead.right || snakeBody.yPos <= snakeHead.bottom && snakeBody.yPos > snakeHead.top && snakeBody.yPos + 30 > snakeHead.bottom && snakeBody.xPos + 30 >= snakeHead.right && snakeBody.xPos <= snakeHead.left) {
      gameOver();
    }
  }
};

var checkGameStatus = function checkGameStatus() {
  if (gameIsRunning) {
    var headTop = head.getBoundingClientRect().top;
    var headRight = head.getBoundingClientRect().right;
    var headBottom = head.getBoundingClientRect().bottom;
    var headLeft = head.getBoundingClientRect().left;
    var topBound = gameBox.getBoundingClientRect().top;
    var rightBound = gameBox.getBoundingClientRect().right;
    var bottomBound = gameBox.getBoundingClientRect().bottom;
    var leftBound = gameBox.getBoundingClientRect().left;

    if (headTop <= topBound) {
      gameOver();
    } else if (headRight >= rightBound) {
      gameOver();
    } else if (headBottom >= bottomBound) {
      gameOver();
    } else if (headLeft <= leftBound) {
      gameOver();
    } else ;
  }
};

var gameOver = function gameOver() {
  gameIsRunning = false;
  gameBox.innerHTML = "<div class=\"game-info\"></div>";
  document.querySelector(".game-info").style.opacity = "0.8";
  document.querySelector(".game-info").innerHTML = "<p>Game Over!</p>";
  restartButton.style.display = "block";
  head.style.top = "400px";
  head.style.left = "650px";
  snakeBodyArr = [];
  bodyCount = 0;
};

var fruitGenerator = function fruitGenerator() {
  var topBound = gameBox.getBoundingClientRect().top;
  var rightBound = gameBox.getBoundingClientRect().right;
  var bottomBound = gameBox.getBoundingClientRect().bottom;
  var leftBound = gameBox.getBoundingClientRect().left;
  var horizontalScreenSize = rightBound - leftBound - 20;
  var verticalScreenSize = bottomBound - topBound - 20;
  var xPosition = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
  var yPosition = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;
  snack.setXCoordinate = xPosition;
  snack.setYCoordinate = yPosition;
  gameBox.innerHTML += snack.render();
};

var fruitGrabbingChecker = function fruitGrabbingChecker() {
  var fruitLeft = snack.xPos;
  var fruitRight = snack.xPos + 20;
  var fruitTop = snack.yPos;
  var fruitBottom = snack.yPos + 20;
  var headTop = head.getBoundingClientRect().top;
  var headRight = head.getBoundingClientRect().right;
  var headBottom = head.getBoundingClientRect().bottom;
  var headLeft = head.getBoundingClientRect().left;
  var leftBound = gameBox.getBoundingClientRect().left;
  var topBound = gameBox.getBoundingClientRect().top;
  var rightBound = gameBox.getBoundingClientRect().right;
  var bottomBound = gameBox.getBoundingClientRect().bottom;
  var snakeHeadTop = headTop - topBound;
  var snakeHeadBottom = headBottom - topBound;
  var snakeHeadLeft = headLeft - leftBound;
  var snakeHeadRight = headRight - leftBound;

  if (snakeHeadRight >= fruitLeft && snakeHeadRight < fruitRight && snakeHeadLeft < fruitLeft && snakeHeadBottom >= fruitTop && snakeHeadTop <= fruitBottom || snakeHeadLeft <= fruitRight && snakeHeadLeft > fruitLeft && snakeHeadRight > fruitRight && snakeHeadBottom >= fruitTop && snakeHeadTop <= fruitBottom || snakeHeadBottom >= fruitTop && snakeHeadBottom < fruitBottom && snakeHeadTop < fruitTop && snakeHeadLeft <= fruitLeft && snakeHeadRight >= fruitRight || snakeHeadTop <= fruitBottom && snakeHeadTop > fruitTop && snakeHeadBottom > fruitBottom && snakeHeadRight >= fruitRight && snakeHeadLeft <= fruitLeft) {
    score += 100;
    gameScore.innerHTML = "Score: ".concat(score);
    var horizontalScreenSize = rightBound - leftBound - 20;
    var verticalScreenSize = bottomBound - topBound - 20;
    var xCo = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
    var yCo = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;
    var fruit = document.querySelector(".fruit");
    fruit.style.top = "".concat(yCo, "px");
    fruit.style.left = "".concat(xCo, "px");
    snack.setXCoordinate = xCo;
    snack.setYCoordinate = yCo;
    var snakeNewPart;

    if (snakeBodyArr.length > 0) {
      if (previousPartMovement == "down") {
        snakeNewPart = new _SnakeBodyPart["default"](snakeBodyArr[bodyCount - 1].xPos, snakeBodyArr[bodyCount - 1].yPos - 31, bodyCount);
      } else if (previousPartMovement == "up") {
        snakeNewPart = new _SnakeBodyPart["default"](snakeBodyArr[bodyCount - 1].xPos, snakeBodyArr[bodyCount - 1].yPos + 31, bodyCount);
      } else if (previousPartMovement == "left") {
        snakeNewPart = new _SnakeBodyPart["default"](snakeBodyArr[bodyCount - 1].xPos + 31, snakeBodyArr[bodyCount - 1].yPos, bodyCount);
      } else if (previousPartMovement == "right") {
        snakeNewPart = new _SnakeBodyPart["default"](snakeBodyArr[bodyCount - 1].xPos - 31, snakeBodyArr[bodyCount - 1].yPos, bodyCount);
      }
    } else {
      snakeNewPart = new _SnakeBodyPart["default"](headLeft, headBottom, bodyCount);
    }

    gameBox.innerHTML += snakeNewPart.render();
    snakeBodyArr.push(snakeNewPart);
    bodyCount++;
  }
}; // Running functions.


document.addEventListener("keypress", function (e) {
  downCheck = false;
  rightCheck = false;
  leftCheck = false;
  upCheck = false;

  if (e.code == "KeyW") {
    upCheck = true;
  } else if (e.code === "KeyS") {
    downCheck = true;
  } else if (e.code === "KeyA") {
    leftCheck = true;
  } else if (e.code === "KeyD") {
    rightCheck = true;
  } else ;
});
setInterval(gameRunning, 1);
startButton.addEventListener("click", countdownStart);
restartButton.addEventListener("click", countdownStart); // To do:
// clean up code.
// high score board.
// media queries.