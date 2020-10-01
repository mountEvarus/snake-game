"use strict";

var _Fruit = _interopRequireDefault(require("./Fruit.js"));

var _SnakeBodyPart = _interopRequireDefault(require("./SnakeBodyPart.js"));

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
var previousBodyPart = 0;
var bodyCount = 0;
var count; // functions.

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

var upFunction = function upFunction() {
  if (gameIsRunning && upCheck) {
    var headPosition = head.getBoundingClientRect();
    var headUp = headPosition.top - 1 + "px";
    head.style.top = headUp;
    snakePic.style.transform = "rotate(-90deg)";

    if (snakeBodyArr.length > 0) {
      for (var i = 0; i < snakeBodyArr.length; i++) {
        var snakePart = document.querySelector(".snake-body-part-".concat(i));
        var snakeBodyPart = snakeBodyArr[i];

        if (snakeBodyPart == snakeBodyArr[0]) {
          if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos > headPosition.top) {
            snakeBodyPart.xCoordinate = headPosition.left;
            snakeBodyPart.yCoordinate = headPosition.top + 31;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.xPos == headPosition.left || snakeBodyPart.yPos < headPosition.top) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
          } else if (snakeBodyPart.xPos > headPosition.left && snakeBodyPart.yPos >= headPosition.top) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else if (snakeBodyPart.xPos < headPosition.left && snakeBodyPart.yPos >= headPosition.top) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else console.log("ERROR - Up prime");
        } else {
          if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos > previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = previousBodyPart.xPos;
            snakeBodyPart.yCoordinate = previousBodyPart.yPos + 31;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos || snakeBodyPart.yPos < previousBodyPart.yPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
          } else if (snakeBodyPart.xPos > previousBodyPart.xPos && snakeBodyPart.yPos >= previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else if (snakeBodyPart.xPos < previousBodyPart.xPos && snakeBodyPart.yPos >= previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else console.log("ERROR - Up lesser");
        }

        previousBodyPart = snakeBodyPart;
      }
    }
  }
};

var leftFunction = function leftFunction() {
  if (gameIsRunning && leftCheck) {
    var headPosition = head.getBoundingClientRect();
    var headLeft = headPosition.left - 1 + "px";
    head.style.left = headLeft;
    snakePic.style.transform = "rotate(-180deg)";

    if (snakeBodyArr.length > 0) {
      for (var i = 0; i < snakeBodyArr.length; i++) {
        var snakePart = document.querySelector(".snake-body-part-".concat(i));
        var snakeBodyPart = snakeBodyArr[i];

        if (snakeBodyPart == snakeBodyArr[0]) {
          if (snakeBodyPart.yPos == headPosition.top && snakeBodyPart.xPos > headPosition.left) {
            snakeBodyPart.xCoordinate = headPosition.left + 31;
            snakeBodyPart.yCoordinate = headPosition.top;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos == headPosition.top || snakeBodyPart.xPos < headPosition.left) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos > headPosition.top && snakeBodyPart.xPos >= headPosition.left) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else if (snakeBodyPart.yPos < headPosition.top && snakeBodyPart.xPos >= headPosition.left) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else console.log("ERROR - Left prime");
        } else {
          if (snakeBodyPart.yPos == previousBodyPart.yPos && snakeBodyPart.xPos > previousBodyPart.xPos) {
            snakeBodyPart.xCoordinate = previousBodyPart.xPos + 31;
            snakeBodyPart.yCoordinate = previousBodyPart.yPos;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos == previousBodyPart.yPos || snakeBodyPart.xPos < previousBodyPart.xPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos > previousBodyPart.yPos && snakeBodyPart.xPos >= previousBodyPart.xPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else if (snakeBodyPart.yPos < previousBodyPart.yPos && snakeBodyPart.xPos >= previousBodyPart.xPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else console.log("ERROR - Left lesser");
        }

        previousBodyPart = snakeBodyPart;
      }
    }
  }
};

var rightFunction = function rightFunction() {
  if (gameIsRunning && rightCheck) {
    var headPosition = head.getBoundingClientRect();
    var headRight = headPosition.left + 1 + "px";
    head.style.left = headRight;
    snakePic.style.transform = "rotate(0deg)";

    if (snakeBodyArr.length > 0) {
      for (var i = 0; i < snakeBodyArr.length; i++) {
        var snakePart = document.querySelector(".snake-body-part-".concat(i));
        var snakeBodyPart = snakeBodyArr[i];

        if (snakeBodyPart == snakeBodyArr[0]) {
          if (snakeBodyPart.yPos == headPosition.top && snakeBodyPart.xPos < headPosition.left) {
            snakeBodyPart.xCoordinate = headPosition.left - 31;
            snakeBodyPart.yCoordinate = headPosition.top;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos == headPosition.top || snakeBodyPart.xPos > headPosition.left) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos > headPosition.top && snakeBodyPart.xPos <= headPosition.left) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else if (snakeBodyPart.yPos < headPosition.top && snakeBodyPart.xPos <= headPosition.left) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else console.log("ERROR - Right prime");
        } else {
          if (snakeBodyPart.yPos == previousBodyPart.yPos && snakeBodyPart.xPos < previousBodyPart.xPos) {
            snakeBodyPart.xCoordinate = previousBodyPart.xPos - 31;
            snakeBodyPart.yCoordinate = previousBodyPart.yPos;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos == previousBodyPart.yPos || snakeBodyPart.xPos > previousBodyPart.xPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.yPos > previousBodyPart.yPos && snakeBodyPart.xPos <= previousBodyPart.xPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else if (snakeBodyPart.yPos < previousBodyPart.yPos && snakeBodyPart.xPos <= previousBodyPart.xPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos);
          } else console.log("ERROR - Left lesser");
        }

        previousBodyPart = snakeBodyPart;
      }
    }
  }
};

var downFunction = function downFunction() {
  if (gameIsRunning && downCheck) {
    var headPosition = head.getBoundingClientRect();
    var headDown = headPosition.top + 1 + "px";
    head.style.top = headDown;
    snakePic.style.transform = "rotate(90deg)";

    if (snakeBodyArr.length > 0) {
      for (var i = 0; i < snakeBodyArr.length; i++) {
        var snakePart = document.querySelector(".snake-body-part-".concat(i));
        var snakeBodyPart = snakeBodyArr[i];

        if (snakeBodyPart == snakeBodyArr[0]) {
          if (snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos < headPosition.top) {
            snakeBodyPart.xCoordinate = headPosition.left;
            snakeBodyPart.yCoordinate = headPosition.top - 31;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.xPos == headPosition.left || snakeBodyPart.yPos > headPosition.top) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
          } else if (snakeBodyPart.xPos > headPosition.left && snakeBodyPart.yPos <= headPosition.top) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else if (snakeBodyPart.xPos < headPosition.left && snakeBodyPart.yPos <= headPosition.top) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else console.log("ERROR - Down prime");
        } else {
          if (snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos < previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = previousBodyPart.xPos;
            snakeBodyPart.yCoordinate = previousBodyPart.yPos - 31;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
            snakePart.style.left = "".concat(snakeBodyPart.xPos, "px");
          } else if (snakeBodyPart.xPos == previousBodyPart.xPos || snakeBodyPart.yPos > previousBodyPart.yPos) {
            snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
            snakePart.style.top = "".concat(snakeBodyPart.yPos, "px");
          } else if (snakeBodyPart.xPos > previousBodyPart.xPos && snakeBodyPart.yPos <= previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else if (snakeBodyPart.xPos < previousBodyPart.xPos && snakeBodyPart.yPos <= previousBodyPart.yPos) {
            snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
            snakePart.style.left = "".concat(snakeBodyPart.xPos);
          } else console.log("ERROR - Down lesser");
        }

        previousBodyPart = snakeBodyPart;
      }
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
      gameIsRunning = false;
      gameBox.innerHTML = "<div class=\"game-info\"></div>";
      document.querySelector(".game-info").style.opacity = "0.8";
      document.querySelector(".game-info").innerHTML = "<p>Game Over!</p>";
      restartButton.style.display = "block";
      head.style.top = "calc(50% - 15px)";
      head.style.left = "calc(50% - 15px)";
      snakeBodyArr = [];
    } else if (headRight >= rightBound) {
      gameIsRunning = false;
      gameBox.innerHTML = "<div class=\"game-info\"></div>";
      document.querySelector(".game-info").style.opacity = "0.8";
      document.querySelector(".game-info").innerHTML = "<p>Game Over!</p>";
      restartButton.style.display = "block";
      head.style.top = "calc(50% - 15px)";
      head.style.left = "calc(50% - 15px)";
      snakeBodyArr = [];
    } else if (headBottom >= bottomBound) {
      gameIsRunning = false;
      gameBox.innerHTML = "<div class=\"game-info\"></div>";
      document.querySelector(".game-info").style.opacity = "0.8";
      document.querySelector(".game-info").innerHTML = "<p>Game Over!</p>";
      restartButton.style.display = "block";
      head.style.top = "calc(50% - 15px)";
      head.style.left = "calc(50% - 15px)";
      snakeBodyArr = [];
    } else if (headLeft <= leftBound) {
      gameIsRunning = false;
      gameBox.innerHTML = "<div class=\"game-info\"></div>";
      document.querySelector(".game-info").style.opacity = "0.8";
      document.querySelector(".game-info").innerHTML = "<p>Game Over!</p>";
      restartButton.style.display = "block";
      head.style.top = "calc(50% - 15px)";
      head.style.left = "calc(50% - 15px)";
      snakeBodyArr = [];
    } else ;
  }
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
  snack.xCoordinate = xPosition;
  snack.yCoordinate = yPosition;
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
    // console.log(snakeBodyArr);
    score += 100;
    gameScore.innerHTML = "Score: ".concat(score);
    var horizontalScreenSize = rightBound - leftBound - 20;
    var verticalScreenSize = bottomBound - topBound - 20;
    var xCo = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
    var yCo = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;
    var fruit = document.querySelector(".fruit");
    fruit.style.top = "".concat(yCo, "px");
    fruit.style.left = "".concat(xCo, "px");
    snack.xCoordinate = xCo;
    snack.yCoordinate = yCo;
    var snakeNewPart = new _SnakeBodyPart["default"](headLeft, headBottom, bodyCount);
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
setInterval(fruitGrabbingChecker, 1);
setInterval(checkGameStatus, 1);
setInterval(upFunction, 1);
setInterval(downFunction, 1);
setInterval(leftFunction, 1);
setInterval(rightFunction, 1);
startButton.addEventListener("click", countdownStart);
restartButton.addEventListener("click", countdownStart); // fix grown snake 2-D movement.
// snake self-interaction.
// fix fruit restart problems.
// Extra:
// clean up code.
// high score board.
// media queries
//  ====================================================================================================================
//  ====================================================================================================================
//  ====================================================================================================================
// Pseudo code for advanced movement.
// if press w:
// move head up
// if first bodyPart:
// if bodyPart.x = head.x && bodyPart.y > head.y:
// move bodyPart up
// else if bodyPart.x = head.x || bodyPart.y < head.y:
// move bodyPart down
// else if bodyPart.x > head .x && bodyPart.y >= head.y:
// move bodyPart left
// else if bodyPart.x < head.x && bodyPart.y >= head.y:
// move bodyPart right
// else:
// if bodyPart.x = previousPart.x && bodyPart.y > previousPart.y:
// move bodyPart up
// else if bodyPart.x = previousPart.x || bodyPart.y < previousPart.y:
// move bodyPart down
// else if bodyPart.x > previousPart.x && bodyPart.y >= previousPart.y:
// move bodyPart left
// else if bodyPart.x < previousPart.x && bodyPart.y >= previousPart.y:
// move bodyPart right
// if press a:
// move head left
// if first bodyPart:
// if bodyPart.y = head.y && bodyPart.x > head.x:
// move bodyPart left
// else if bodyPart.y = head.y || bodyPart.x < head.x:
// move bodyPart right
// else if bodyPart.y > head .y && bodyPart.x >= head.x:
// move bodyPart up
// else if bodyPart.y < head.y && bodyPart.x >= head.x:
// move bodyPart down
// else:
// if bodyPart.y = previousPart.y  && bodyPart.x > previousPart.x:
// move bodyPart left
// else if bodyPart.y = previousPart.y ||bodyPart.x < previousPart.x:
// move bodyPart right
// else if bodyPart.y > previousPart.y && bodyPart.x >= previousPart.x:
// move bodyPart up
// else if bodyPart.y < previousPart.y && bodyPart.x >= previousPart.x:
// move bodyPart down
// if press s:
// move head down
// if first bodyPart:
// if bodyPart.x = head.x && bodyPart.y < head.y:
// move bodyPart down
// else if bodyPart.x = head.x || bodyPart.y > head.y:
// move bodyPart up
// else if bodyPart.x > head .x && bodyPart.y <= head.y:
// move bodyPart left
// else if bodyPart.x < head.x && bodyPart.y <= head.y:
// move bodyPart right
// else:
// if bodyPart.x = previousPart.x && bodyPart.y < previousPart.y:
// move bodyPart down
// else if bodyPart.x = previousPart.x || bodyPart.y > previousPart.y:
// move bodyPart up
// else if bodyPart.x > previousPart.x && bodyPart.y <= previousPart.y:
// move bodyPart left
// else if bodyPart.x < previousPart.x && bodyPart.y <= previousPart.y:
// move bodyPart right
// if press d:
// move head right.
// if first bodyPart:
// if bodyPart.y = head.y && bodyPart.x < head.x:
// move bodyPart right
// else if bodyPart.y = head.y || bodyPart.x > head.x:
// move bodyPart left
// else if bodyPart.y > head .y && bodyPart.x <= head.x;
// move bodyPart up
// else if bodyPart.y < head.y && bodyPart.x <= head.x;
// move bodyPart down
// else:
// if bodyPart.y = previousPart.y && bodyPart.x < previousPart.x:
// move bodyPart right
// else if bodyPart.y = previousPart.y || bodyPart.x > previousPart.x:
// move bodyPart left
// else if bodyPart.y > previousPart.y && bodyPart.x <= previousPart.x;
// move bodyPart up
// else if bodyPart.y < previousPart.y && bodyPart.x <= previousPart.x;
// move bodyPart down