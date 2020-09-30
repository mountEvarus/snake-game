import Fruit from "./Fruit.js";
import SnakeBodypart from "./SnakeBodyPart.js";

// variables.
const head = document.querySelector(".circle");
const gameBox = document.querySelector(".screen");
const gameScore = document.querySelector(".scoreboard");
let gameIsRunning = true;
let upCheck = true;
let downCheck = false;
let rightCheck = false;
let leftCheck = false;
var score = 0;
const snack = new Fruit (0,0);
const snakeBodyArr = [];
let previousBodyPart = 0;
let bodyCount = 0;

// functions.
const upFunction = () => {
    if(gameIsRunning && upCheck) {
        const headPosition = head.getBoundingClientRect();
        const headUp = headPosition.top - 1  + "px";
        head.style.top = headUp;

        if(snakeBodyArr.length > 0) {
            for (let i = 0; i < snakeBodyArr.length; i++) {
                const snakePart = document.querySelector(`.snake-body-part-${i}`);
                const snakeBodyPart = snakeBodyArr[i];
                if(snakeBodyPart == snakeBodyArr[0]) {
                    if(snakeBodyPart.xPos == headPosition.left) {
                        snakeBodyPart.xCoordinate = headPosition.left;
                        snakeBodyPart.yCoordinate = headPosition.top + 31;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.xPos > headPosition.left){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    } else if(snakeBodyPart.xPos < headPosition.left){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    }
                } else {
                    if(snakeBodyPart.xPos == previousBodyPart.xPos) {
                        snakeBodyPart.xCoordinate = previousBodyPart.xPos;
                        snakeBodyPart.yCoordinate =  previousBodyPart.yPos + 31;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.xPos > previousBodyPart.xPos){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    } else if(snakeBodyPart.xPos < previousBodyPart.xPos){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    }
                }
                previousBodyPart = snakeBodyPart;
                
            }
        }
    }
}
const leftFunction = () => {
    if(gameIsRunning && leftCheck) {
        const headPosition = head.getBoundingClientRect();
        const headLeft = headPosition.left - 1 + "px";
        head.style.left = headLeft;

        if(snakeBodyArr.length > 0) {
            for (let i = 0; i < snakeBodyArr.length; i++) {
                const snakePart = document.querySelector(`.snake-body-part-${i}`);
                const snakeBodyPart = snakeBodyArr[i];
                if(snakeBodyPart == snakeBodyArr[0]) {
                    if(snakeBodyPart.yPos == headPosition.top) {
                        snakeBodyPart.xCoordinate = headPosition.left + 31;
                        snakeBodyPart.yCoordinate = headPosition.top;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.yPos > headPosition.top){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    } else if(snakeBodyPart.yPos < headPosition.top){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    }
                } else {
                    if(snakeBodyPart.yPos == previousBodyPart.yPos) {
                        snakeBodyPart.xCoordinate = previousBodyPart.xPos + 31;
                        snakeBodyPart.yCoordinate = previousBodyPart.yPos;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.yPos > previousBodyPart.yPos){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    } else if(snakeBodyPart.yPos < previousBodyPart.yPos){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    }
                }
                previousBodyPart = snakeBodyPart;
                
            }
        } 
    }
}
const rightFunction = () => {
    if(gameIsRunning && rightCheck) {
        const headPosition = head.getBoundingClientRect();
        const headRight = headPosition.left + 1 + "px";
        head.style.left = headRight;
        
        if(snakeBodyArr.length > 0) {
            for (let i = 0; i < snakeBodyArr.length; i++) {
                const snakePart = document.querySelector(`.snake-body-part-${i}`);
                const snakeBodyPart = snakeBodyArr[i];
                if(snakeBodyPart == snakeBodyArr[0]) {
                    if(snakeBodyPart.yPos == headPosition.top) {
                        snakeBodyPart.xCoordinate = headPosition.left - 31;
                        snakeBodyPart.yCoordinate = headPosition.top;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.yPos > headPosition.top){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    } else if(snakeBodyPart.yPos < headPosition.top){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    }
                } else {
                    if(snakeBodyPart.yPos == previousBodyPart.yPos) {
                        snakeBodyPart.xCoordinate = previousBodyPart.xPos - 31;
                        snakeBodyPart.yCoordinate = previousBodyPart.yPos;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.yPos > previousBodyPart.yPos){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos - 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    } else if(snakeBodyPart.yPos < previousBodyPart.yPos){
                        snakeBodyPart.yCoordinate = snakeBodyPart.yPos + 1;
                        snakePart.style.top = `${snakeBodyPart.yPos}`;
                    }
                }
                previousBodyPart = snakeBodyPart;
                
            }
        }
    }
}
const downFunction = () => {
    if(gameIsRunning && downCheck) {
        const headPosition = head.getBoundingClientRect();
        const headDown = headPosition.top + 1 + "px";
        head.style.top = headDown;

        if(snakeBodyArr.length > 0) {
            for (let i = 0; i < snakeBodyArr.length; i++) {
                const snakePart = document.querySelector(`.snake-body-part-${i}`);
                const snakeBodyPart = snakeBodyArr[i];
                if(snakeBodyPart == snakeBodyArr[0]) {
                    if(snakeBodyPart.xPos == headPosition.left) {
                        snakeBodyPart.xCoordinate = headPosition.left;
                        snakeBodyPart.yCoordinate = headPosition.top - 31;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.xPos > headPosition.left){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    } else if(snakeBodyPart.xPos < headPosition.left){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    }
                } else {
                    if(snakeBodyPart.xPos == previousBodyPart.xPos) {
                        snakeBodyPart.xCoordinate = previousBodyPart.xPos;
                        snakeBodyPart.yCoordinate =  previousBodyPart.yPos - 31;
                        snakePart.style.top = `${snakeBodyPart.yPos}px`;
                        snakePart.style.left = `${snakeBodyPart.xPos}px`;
                    } else if(snakeBodyPart.xPos > previousBodyPart.xPos){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos - 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    } else if(snakeBodyPart.xPos < previousBodyPart.xPos){
                        snakeBodyPart.xCoordinate = snakeBodyPart.xPos + 1;
                        snakePart.style.left = `${snakeBodyPart.xPos}`;
                    }
                }
                previousBodyPart = snakeBodyPart;
                
            }
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
            gameIsRunning = false;
        } else if(headRight >= rightBound) {
            gameIsRunning = false;
        } else if(headBottom >= bottomBound) {
            gameIsRunning = false;
        } else if(headLeft <= leftBound) {
            gameIsRunning = false;
        } else;
    }
    
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
    snack.xCoordinate = xPosition;
    snack.yCoordinate = yPosition;
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
        gameScore.innerHTML = `Score: ${score}`

        const horizontalScreenSize = rightBound - leftBound - 20;
        const verticalScreenSize = bottomBound - topBound - 20;
        const xCo = Math.floor(Math.random() * (horizontalScreenSize - 80)) + 40;
        const yCo = Math.floor(Math.random() * (verticalScreenSize - 80)) + 40;

        const fruit = document.querySelector(".fruit");
        fruit.style.top = `${yCo}px`;
        fruit.style.left = `${xCo}px`;
        snack.xCoordinate = xCo;
        snack.yCoordinate = yCo;

        const snakeNewPart = new SnakeBodypart(headLeft, headBottom, bodyCount);
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
fruitGenerator();
setInterval(fruitGrabbingChecker, 1);
setInterval(checkGameStatus, 1);
setInterval(upFunction, 1);
setInterval(downFunction, 1);
setInterval(leftFunction, 1);
setInterval(rightFunction, 1);

// fix grown snake 2-D movement.
// snake self-interaction.
// starting screen.
// game-over screen.

// Extra:
// clean up code.
// high score board.
// media queries