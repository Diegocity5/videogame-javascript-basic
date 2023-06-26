//USE API CANVAS
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize; //Size of canvas
let elementsSize; //Size elements into canvas

const playerPosition = {
  x: undefined,
  y: undefined,
}
const giftPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
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

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapsRows = map.trim().split("\n");
  const mapsRowCols = mapsRows.map((item) => item.trim().split(""));

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
            console.log({playerPosition});
          }
        }else if(col == 'I'){
          giftPosition.x = posX;
          giftPosition.y = posY;
          console.log({giftPosition});
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
    console.log('Subiste de nisvel!');
  }
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
  console.log("move up");
  if((playerPosition.y - elementsSize) < elementsSize){
    console.log("OUT");
  }else{
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveToLeft(){
  console.log("move left");
  if((playerPosition.x - elementsSize) < elementsSize){
    console.log("OUT");
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveToRight(){
  console.log("move right");
  if((playerPosition.x  + elementsSize) > canvasSize){
    console.log("OUT");
  }else{
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveToDown(){
  console.log("move down");
  if((playerPosition.y  + elementsSize) > canvasSize){
    console.log("OUT");
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
}
