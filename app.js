;
const gameBoard =  document.querySelector('.game_board');// crear tablero
const messageTurn= document.querySelector('.game_turn'); //mostrar a quien el toca jugar
const endGame = document.querySelector('.endgame');//contenedor de la pantalla final
const endGameResult = document.querySelector('.endgame_result');//muestra que jujagor  ha ganado
const buttonReset = document.querySelector('.endgame_button');// boton para volver a jugar 


let isTurnX = true  // jugador que va inicias
let turn = 0;
let maxTurn = 9
//objeto
let players = {
    x:"cross", 
    o:"circle"
}

const winnigPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]

]

startGame();

function startGame() {
    createBoard();  
    messageTurn.textContent = isTurnX ? 'x' : 'o'
     isTurnX = true  // jugador que va iniciar
    turn = 0;
    endGame.classList.remove('show')
}
    

messageTurn.textContent = isTurnX ? "X" : "O";
createBoard();

// se crea el trablero 
function createBoard (){
    const cells = 9;

    while (gameBoard.firstElementChild) {
        gameBoard.firstElementChild.remove() //para borrar el tabler
    }

    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
        div.classList.add('cell') ;
        div.addEventListener('click',handleGame ,  {once:true})

        gameBoard.append(div);
        
    }
}


function handleGame(e) {
    const currentCell = e.currentTarget;
    const currentTurn = isTurnX ? players.x : players.o
    
    turn++;
    drawShape(currentCell,currentTurn);

    if(checkWinner(currentTurn)){
        return;
    }

    if(turn === maxTurn){
        showEndGame(false);
    }

    changeTurn();
}


function drawShape(element, newClass) {
    element.classList.add(newClass);
}

function changeTurn() {
    isTurnX = !isTurnX;
    messageTurn.textContent = isTurnX ? "X" : "O";
}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell');
    const winner = winnigPosition.some (array =>{
        return array.every(position=>{
           return cells[position].classList.contains
            (currentPlayer);
        });
    });

        if (!winner){
            return ;
        }
        showEndGame(true);
        return true;

    console.log(winner)
}

function showEndGame (winner){

    endGame.classList.add('show');

    if (winner) {
        endGameResult.textContent = `¡${isTurnX ? "x" : " o " } ha ganado el juego!`
    }else{
        
        endGameResult.textContent = `¡El juego  se ha empadatado!`
    }
}

buttonReset.addEventListener('click', startGame);
