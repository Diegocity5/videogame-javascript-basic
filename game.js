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

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame(){
    game.font = elementsSize + "px Verdana"
    game.textAling = "end";

    for(let i=0; i<=10; i++){
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
    }
    //Metodos y propiedades de estilo para retangulos
    // game.fillRect(0, 50, 100, 100);
    // game.clearRect(50, 50, 50, 50);

    //Metodos y propiedades de estilo para texto
    // game.font = "48px roboto";
    // game.fillStyle = "limegreen";
    // game.textAlign = "center";
    // game.fillText("Platzo", 10, 50);
}