//USE API CANVAS
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame(){
    //Metodos y propiedades de estilo para retangulos
    // game.fillRect(0, 50, 100, 100);
    // game.clearRect(50, 50, 50, 50);

    //Metodos y propiedades de estilo para texto
    game.font = "48px roboto";
    game.fillStyle = "limegreen";
    game.textAlign = "center";
    game.fillText("Platzo", 10, 50);
}