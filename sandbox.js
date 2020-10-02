import Fruit from "./assets/classes/Fruit.js";
import SnakeBodypart from "./assets/classes/SnakeBodyPart.js";

// variables.
const head = document.querySelector(".circle");
const gameBox = document.querySelector(".screen");
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const gameScore = document.querySelector(".scoreboard");
const snakePic = document.querySelector(".snake-head");
let gameIsRunning = false;
let gameIsStarting = false;
let upCheck = true;
let downCheck = false;
let rightCheck = false;
let leftCheck = false;
var score = 0;
const snack = new Fruit (0,0);
let snakeBodyArr = [];
let bodyCount = 0;
let count;
let previousPartMovement = "up";

// functions.
const countdownStart = () => {
    score = 0;
    gameScore.innerHTML = `Score: ${score}`
    count = 3;
    document.querySelector(".game-info").style.opacity = "0.8";
    gameIsStarting = true;
    gameStart();
    restartButton.style.display = "none";
    fruitGenerator();
}
const gameStart = () => {
    if(gameIsStarting) {
        const gameTest = document.querySelector(".game-info");
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
}
const gameRunning = () => {
    movementFunction();
    fruitGrabbingChecker();
    checkGameStatus();
}
const movementFunction = () => {
    if(gameIsRunning) {
        primaryCheck()
        if(snakeBodyArr.length > 0) {
            let headPosition = head.getBoundingClientRect();
            let previousBodyPart = 0;
            for (let i = 0; i < snakeBodyArr.length; i++) {
                const snakeBodyPart = snakeBodyArr[i];
                const snakeHTML = document.querySelector(`.snake-body-part-${i}`);
                if(i === 0) {
                    if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos <= (headPosition.top +31) && previousPartMovement == "up") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos > (headPosition.top +31) && previousPartMovement == "up") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos > headPosition.left && snakeBodyPart.yPos == headPosition.top && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos < headPosition.left && snakeBodyPart.yPos == headPosition.top && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos >= (headPosition.top -31) && previousPartMovement == "down") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos < (headPosition.top -31) && previousPartMovement == "down") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos >= (headPosition.left + 31) && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "left") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos < (headPosition.left + 31) && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "left") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos > headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos == headPosition.left && snakeBodyPart.yPos < headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos > (headPosition.left - 31) && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "right") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos <= (headPosition.left + 31) && snakeBodyPart.yPos == headPosition.top && previousPartMovement == "right") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos < headPosition.left && (snakeBodyPart.yPos < headPosition.top || snakeBodyPart.yPos > headPosition.top) && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos > headPosition.left && (snakeBodyPart.yPos < headPosition.top || snakeBodyPart.yPos > headPosition.top) && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if((snakeBodyPart.xPos < headPosition.left || snakeBodyPart.xPos > headPosition.left) && snakeBodyPart.yPos < headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if((snakeBodyPart.xPos < headPosition.left || snakeBodyPart.xPos > headPosition.left) && snakeBodyPart.yPos > headPosition.top && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    }
                } else {
                    if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos <= (previousBodyPart.yPos) && previousPartMovement == "up") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos > (previousBodyPart.yPos) && previousPartMovement == "up") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos > previousBodyPart.xPos && snakeBodyPart.yPos == previousBodyPart.yPos && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos < previousBodyPart.xPos && snakeBodyPart.yPos == previousBodyPart.yPos && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos >= (previousBodyPart.yPos -31) && previousPartMovement == "down") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos < (previousBodyPart.yPos -31) && previousPartMovement == "down") {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos >= (previousBodyPart.xPos + 31) && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "left") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos < (previousBodyPart.xPos + 31) && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "left") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos > previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    } else if(snakeBodyPart.xPos == previousBodyPart.xPos && snakeBodyPart.yPos < previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if(snakeBodyPart.xPos > (previousBodyPart.xPos - 31) && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "right") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if(snakeBodyPart.xPos <= (previousBodyPart.xPos + 31) && snakeBodyPart.yPos == previousBodyPart.yPos && previousPartMovement == "right") {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos < previousBodyPart.xPos && (snakeBodyPart.yPos < previousBodyPart.yPos || snakeBodyPart.yPos > previousBodyPart.yPos) && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos + 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "right";
                    } else if(snakeBodyPart.xPos > previousBodyPart.xPos && (snakeBodyPart.yPos < previousBodyPart.yPos || snakeBodyPart.yPos > previousBodyPart.yPos) && (previousPartMovement == "up" || previousPartMovement == "down")) {
                        snakeBodyPart.setXCoordinate = snakeBodyPart.xPos - 1;
                        snakeHTML.style.left = `${snakeBodyPart.xPos}`;
                        previousPartMovement = "left";
                    } else if((snakeBodyPart.xPos < previousBodyPart.xPos || snakeBodyPart.xPos > previousBodyPart.xPos) && snakeBodyPart.yPos < previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos + 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "down";
                    } else if((snakeBodyPart.xPos < previousBodyPart.xPos || snakeBodyPart.xPos > previousBodyPart.xPos) && snakeBodyPart.yPos > previousBodyPart.yPos && (previousPartMovement == "left" || previousPartMovement == "right")) {
                        snakeBodyPart.setYCoordinate = snakeBodyPart.yPos - 1;
                        snakeHTML.style.top = `${snakeBodyPart.yPos}`;
                        previousPartMovement = "up";
                    }
                    checkSepukuStatus(headPosition, snakeBodyArr);
                }
                previousBodyPart = snakeBodyPart;
            }
        }
    }
}
const primaryCheck = () => {
        previousPartMovement;
        let headPosition = head.getBoundingClientRect();
        if(upCheck) {
            const headUp = headPosition.top - 1  + "px";
            head.style.top = headUp;
            snakePic.style.transform = "rotate(-90deg)";
            previousPartMovement = "up";
        } else if(leftCheck) {
            const headLeft = headPosition.left - 1 + "px";
            head.style.left = headLeft;
            snakePic.style.transform = "rotate(-180deg)";
            previousPartMovement = "left";
        } else if (rightCheck) {
            const headRight = headPosition.left + 1 + "px";
            head.style.left = headRight;
            snakePic.style.transform = "rotate(0deg)";
            previousPartMovement = "right";
        } else if (downCheck) {
            const headDown = headPosition.top + 1 + "px";
            head.style.top = headDown;
            snakePic.style.transform = "rotate(90deg)";
            previousPartMovement = "down";
        }
        return previousPartMovement;
}
const checkSepukuStatus = (snakeHead, snakeArr) => {
    for (let i = 1; i < snakeArr.length; i++) {
        const snakeBody = snakeArr[i];
    if((snakeBody.xPos + 30 >= snakeHead.left && snakeBody.xPos + 30 < snakeHead.right && snakeBody.xPos < snakeHead.left && snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos <= snakeHead.bottom) 
    || (snakeBody.xPos <= snakeHead.right && snakeBody.xPos > snakeHead.left && snakeBody.xPos + 30 > snakeHead.right && snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos <= snakeHead.bottom) 
    || (snakeBody.yPos + 30 >= snakeHead.top && snakeBody.yPos + 30 < snakeHead.bottom && snakeBody.yPos < snakeHead.top && snakeBody.xPos <= snakeHead.left && snakeBody.xPos + 30 >= snakeHead.right) 
    || (snakeBody.yPos <= snakeHead.bottom && snakeBody.yPos > snakeHead.top && snakeBody.yPos + 30 > snakeHead.bottom && snakeBody.xPos + 30 >= snakeHead.right && snakeBody.xPos <= snakeHead.left)) {
            gameOver();
        }
    }
}
const checkGameStatus = () => {
    if(gameIsRunning) {
        const headTop = head.getBoundingClientRect().top;
        const headRight = head.getBoundingClientRect().right;
        const headBottom = head.getBoundingClientRect().bottom;
        const headLeft = head.getBoundingClientRect().left;
        const topBound = gameBox.getBoundingClientRect().top;
        const rightBound = gameBox.getBoundingClientRect().right;
        const bottomBound = gameBox.getBoundingClientRect().bottom;
        const leftBound = gameBox.getBoundingClientRect().left;
        
        if(headTop <= topBound) {
            gameOver();
        } else if(headRight >= rightBound) {
            gameOver();
        } else if(headBottom >= bottomBound) {
            gameOver();
        } else if(headLeft <= leftBound) {
            gameOver();
        } else;
    }
}
const gameOver = () => {
    gameIsRunning = false;
    gameBox.innerHTML = `<div class="game-info"></div>`;
    document.querySelector(".game-info").style.opacity = "0.8";
    document.querySelector(".game-info").innerHTML = `<p>Game Over!</p>`;
    restartButton.style.display = "block";
    head.style.top = "400px";
    head.style.left = "650px";
    snakeBodyArr = [];
    bodyCount = 0;
}
const fruitGenerator = () => {
    const topBound = gameBox.getBoundingClientRect().top;
    const rightBound = gameBox.getBoundingClientRect().right;
    const bottomBound = gameBox.getBoundingClientRect().bottom;
    const leftBound = gameBox.getBoundingClientRect().left;
    const horizontalScreenSize = rightBound - leftBound - 20;
    const verticalScreenSize = bottomBound - topBound - 20;

    const xPosition = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
    const yPosition = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;
    snack.setXCoordinate = xPosition;
    snack.setYCoordinate = yPosition;
    gameBox.innerHTML += snack.render();
}
const fruitGrabbingChecker = () => {
    const fruitLeft = snack.xPos;
    const fruitRight = snack.xPos + 20;
    const fruitTop = snack.yPos;
    const fruitBottom = snack.yPos + 20;
    const headTop = head.getBoundingClientRect().top;
    const headRight = head.getBoundingClientRect().right;
    const headBottom = head.getBoundingClientRect().bottom;
    const headLeft = head.getBoundingClientRect().left;
    const leftBound = gameBox.getBoundingClientRect().left;
    const topBound = gameBox.getBoundingClientRect().top;
    const rightBound = gameBox.getBoundingClientRect().right;
    const bottomBound = gameBox.getBoundingClientRect().bottom;

    const snakeHeadTop = headTop - topBound;
    const snakeHeadBottom = headBottom - topBound;
    const snakeHeadLeft = headLeft - leftBound;
    const snakeHeadRight = headRight - leftBound;

    if((snakeHeadRight >= fruitLeft && snakeHeadRight < fruitRight && snakeHeadLeft < fruitLeft && snakeHeadBottom >= fruitTop && snakeHeadTop <= fruitBottom) 
    || (snakeHeadLeft <= fruitRight && snakeHeadLeft > fruitLeft && snakeHeadRight > fruitRight && snakeHeadBottom >= fruitTop && snakeHeadTop <= fruitBottom) 
    || (snakeHeadBottom >= fruitTop && snakeHeadBottom < fruitBottom && snakeHeadTop < fruitTop && snakeHeadLeft <= fruitLeft && snakeHeadRight >= fruitRight) 
    || (snakeHeadTop <= fruitBottom && snakeHeadTop > fruitTop && snakeHeadBottom > fruitBottom && snakeHeadRight >= fruitRight && snakeHeadLeft <= fruitLeft)) {
        score += 100;
        gameScore.innerHTML = `Score: ${score}`;
        const horizontalScreenSize = rightBound - leftBound - 20;
        const verticalScreenSize = bottomBound - topBound - 20;
        const xCo = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
        const yCo = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;

        const fruit = document.querySelector(".fruit");
        fruit.style.top = `${yCo}px`;
        fruit.style.left = `${xCo}px`;
        snack.setXCoordinate = xCo;
        snack.setYCoordinate = yCo;

        let snakeNewPart;
        if(snakeBodyArr.length > 0) {
            if(previousPartMovement == "down") {
                snakeNewPart = new SnakeBodypart((snakeBodyArr[bodyCount-1].xPos), (snakeBodyArr[bodyCount-1].yPos - 31), bodyCount); 
            } else if(previousPartMovement == "up") {
                snakeNewPart = new SnakeBodypart((snakeBodyArr[bodyCount-1].xPos), (snakeBodyArr[bodyCount-1].yPos + 31), bodyCount); 
            } else if(previousPartMovement == "left") {
                snakeNewPart = new SnakeBodypart((snakeBodyArr[bodyCount-1].xPos + 31), (snakeBodyArr[bodyCount-1].yPos), bodyCount); 
            } else if(previousPartMovement == "right") {
                snakeNewPart = new SnakeBodypart((snakeBodyArr[bodyCount-1].xPos - 31), (snakeBodyArr[bodyCount-1].yPos), bodyCount); 
            }
        } else {
            snakeNewPart = new SnakeBodypart((headLeft), (headBottom), bodyCount);
            console.log(snakeNewPart);
        }
        gameBox.innerHTML += snakeNewPart.render();
        snakeBodyArr.push(snakeNewPart);
        bodyCount++;
    }
}

// Running functions.
document.addEventListener("keypress", function(e) {
    downCheck = false;
    rightCheck = false;
    leftCheck = false;
    upCheck = false;
    if(e.code == "KeyW") {
        upCheck = true;
    } else if(e.code === "KeyS") {
        downCheck = true;
    } else if(e.code === "KeyA") {
        leftCheck = true;
    } else if(e.code === "KeyD") {
        rightCheck = true;
    } else;
});
setInterval(gameRunning, 1);
startButton.addEventListener("click", countdownStart);
restartButton.addEventListener("click", countdownStart);

// To do:
// fix fruit restart problems.
// clean up code.
// high score board.
// media queries.