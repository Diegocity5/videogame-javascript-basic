//USE API CANVAS
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime =  document.querySelector("#time");
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
}
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame(){
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if(!map){
    gameWinAndSetRecord();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapsRows = map.trim().split("\n");
  const mapsRowCols = mapsRows.map((item) => item.trim().split(""));

  showLives();

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapsRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);


      if (col == 'O') {
          if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
          }
        }else if(col == 'I'){
          giftPosition.x = posX;
          giftPosition.y = posY;
        }else if(col == 'X'){
          enemyPositions.push({
            x: posX,
            y: posY,
          })
        }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}
function movePlayer(){
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;
  
  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositions.some(item => item.x.toFixed(3) == playerPosition.x.toFixed(3) && item.y.toFixed(3) == playerPosition.y.toFixed(3))
  
  if(enemyCollision){
    levelFail();
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
  console.log('New level :)!');
  level++;
  startGame();
}
function levelFail(){
  console.log("Chocaste contra un enemigo");
  lives--;

  if(lives <= 0){
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function gameWinAndSetRecord(){
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.textContent = "Congratulations on winning";
    } else {
      pResult.textContent = "Sorry you didn't beat the record.";
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.textContent = "Okay, but you can get through the time";
  }

}

function showLives(){
  const hearts = emojis["HEART"].repeat(lives);
  spanLives.textContent = hearts;
}
function showTime() {
  timePlayer = Date.now() - timeStart
  spanTime.textContent = timePlayer;
}
function showRecord() {
  spanRecord.textContent = localStorage.getItem('record_time');
}

document.addEventListener("keyup", moveByKeys);
btnUp.addEventListener("click", moveToUp);
btnLeft.addEventListener("click", moveToLeft);
btnRight.addEventListener("click", moveToRight);
btnDown.addEventListener("click", moveToDown);

function moveByKeys(event) {
  switch (event.key) {
    case "ArrowUp":
        moveToUp();
      break;
    case "ArrowDown":
        moveToDown();
      break;
    case "ArrowLeft":
        moveToLeft();
      break;
    case "ArrowRight":
        moveToRight();
      break;
  }
}
function moveToUp(){
  if((playerPosition.y - elementsSize) < elementsSize){
    console.log("OUT");
  }else{
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveToLeft(){
  if((playerPosition.x - elementsSize) < elementsSize){
    console.log("OUT");
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveToRight(){
  if((playerPosition.x  + elementsSize) > canvasSize){
    console.log("OUT");
  }else{
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveToDown(){
  if((playerPosition.y  + elementsSize) > canvasSize){
    console.log("OUT");
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
}
