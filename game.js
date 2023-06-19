//USE API CANVAS
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;//Size of canvas
let elementsSize;//Size elements into canvas

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = canvasSize / 10 - 2;

    startGame();
}

function startGame(){
    game.font = elementsSize + "px Verdana"
    game.textAlign = "end";
    
    const map = maps[2];
    let mapsRows = map.trim().split('\n');
    let mapsCols = mapsRows.map(item => item.trim().split(""));

    console.log(mapsCols);

    for(let row=1; row <=10; row++){
        for(let col=1; col <=10; col++){
            game.fillText(emojis[mapsCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    }
}
