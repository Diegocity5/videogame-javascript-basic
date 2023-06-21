//USE API CANVAS
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize; //Size of canvas
let elementsSize; //Size elements into canvas

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

  const map = maps[1];
  let mapsRows = map.trim().split("\n");
  let mapsCols = mapsRows.map((item) => item.trim().split(""));

  mapsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      game.fillText(emoji, posX, posY);
    });
  });
}

document.addEventListener("keyup", accion);
btnUp.addEventListener("click", moveToUp);
btnLeft.addEventListener("click", moveToLeft);
btnRight.addEventListener("click", moveToRight);
btnDown.addEventListener("click", moveToDown);

function accion(event) {
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
}
function moveToDown(){
  console.log("move down");
}
function moveToLeft(){
  console.log("move left");
}
function moveToRight(){
  console.log("move right");
}
