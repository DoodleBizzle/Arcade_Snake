

let snake = {
    body: [[50, 47], [50, 48], [50, 49], [50, 50]],
    nextDirection: [1, 0]
}

let gameState = {
    apple: [11, 8],
    snake: snake
}

// global Elements
const board = document.querySelector('#gameBoard');
const score = document.querySelector('#Score')


//---------------Helper Functions----------------------------
function removeTailClass(){
    const element = snake.body[0];
    const row = element[0];
    const column = element[1];
    const cell = document.getElementById(`${row},${column}`);
    cell.classList.remove("snake");
}

function removeAppleClass(){
    const element = gameState.apple;
    const row = element[0];
    const column = element[1];
    const cell = document.getElementById(`${row},${column}`);
    cell.classList.remove("apple");
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randomizeApple(){
    let apple = gameState.apple
    apple[0] = getRandomNum(0 , 99);
    apple[1] = getRandomNum(0 , 99);
}
//-----------------Make Board--------------------------------
// row = index = y
// column = index2 = x

function makeBoard(){
    for (let index = 0; index < 100; index++){
        for (let index2 = 0; index2 < 100; index2++){
            const cell = document.createElement('div');
            cell.id = [index, index2];
            board.appendChild(cell);
        }
    }   
}

// ---------------- Update State-------------------------------
setInterval(tick, 1000 / 25)

function tick() {
    fruits();
    renderSnake();
    snakeMovement();
}
makeBoard();


//-------------------Render Game--------------------------------

function renderSnake(){
    for (let index = 0; index < snake.body.length; index++) {
        const element = snake.body[index];
        const row = element[0];
        const column = element[1];
        const cell = document.getElementById(`${row},${column}`);
        cell.classList.add("snake");
    }
}

function fruits(){
        const element = gameState.apple;
        const row = element[0];
        const column = element[1];
        const fruit = document.getElementById(`${row},${column}`);
        fruit.classList.add("apple");     

}

//---------------------Actions done in Game -----------------------------

function snakeMovement() {
    const dirColumn = snake.nextDirection[0];
    const dirRow = snake.nextDirection[1];
    const index = snake.body.length - 1;
    const head = snake.body[index];
    const newHead = [head[0] + dirRow , head[1] + dirColumn];
    const apple = gameState.apple;
    if (apple[0] === head[0] && apple[1] === head[1]){
    snake.body.push(newHead);
    removeTailClass();
    removeAppleClass();
    randomizeApple();
    } else {
        snake.body.push(newHead);
        removeTailClass();
        snake.body.shift()
    }
    ;
    
}

document.addEventListener('keydown', (event) =>{
        let input = snake.nextDirection;
        if (event.code === "ArrowUp"){
            input[0] = 0;
            input[1] = -1;
        } else if (event.code === "ArrowDown"){
            input[0] = 0;
            input[1] = 1;
        } else if (event.code === "ArrowLeft") {
            input[0] = -1;
            input[1] = 0;
        } else if (event.code === "ArrowRight") {
            input[0] = 1;
            input[1] = 0;
        }
        
    })

