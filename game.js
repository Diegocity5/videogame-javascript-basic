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


let canvasSize; //Size of canvas
let elementsSize; //Size elements into canvas
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

function fixNumber(n){
  return Number(n.toFixed(0));
}

function setCanvasSize(){
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvasSize = fixNumber(canvasSize);
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = fixNumber(canvasSize / 10);

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}

function startGame(){
  game.font = elementsSize * 0.8 + "px Verdana";
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
  game.clearRect(0,0, canvasSize,canvasSize);

  mapsRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = fixNumber(elementsSize * (colI + 1));
      const posY = fixNumber(elementsSize * (rowI + 1));


      if (col == 'O') {
          if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = fixNumber(posX);
            playerPosition.y = fixNumber(posY);
          }
        }else if(col == 'I'){
          giftPosition.x = fixNumber(posX);
          giftPosition.y = fixNumber(posY);
        }else if(col == 'X'){
          enemyPositions.push({
            x: fixNumber(posX),
            y: fixNumber(posY),
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

  const enemyCollision = enemyPositions.some(enemy => enemy.x.toFixed(3) == playerPosition.x.toFixed(3) && enemy.y.toFixed(3) == playerPosition.y.toFixed(3))

  if(enemyCollision){
    setTimeout(levelFail, 100);
    game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
    return;
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
  console.log('Level up :)!');
  level++;
  startGame();
}
function levelFail(){
  console.log("Enemy");
  lives--;

  if(lives <= 0){
    level = 0;
    lives = 3;
    timeStart;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function gameWinAndSetRecord(){
  console.log('¡Game Finished!');
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.textContent = "You made a new record! Congratulations.";
    } else {
      pResult.textContent = "Sorry, this is not a record 😓";
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.textContent = "First time playing? Try to get a new record 😎";
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
    console.log("Out");
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
