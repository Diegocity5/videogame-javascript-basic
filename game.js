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
  y: undefined
}

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
        }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer(){
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
  playerPosition.y -= elementsSize;
  startGame();
}
function moveToLeft(){
  console.log("move left");
  playerPosition.x -= elementsSize;
  startGame();
}
function moveToRight(){
  console.log("move right");
  playerPosition.x += elementsSize;
  startGame();
}
function moveToDown(){
  console.log("move down");
  playerPosition.y += elementsSize;
  startGame();
}
