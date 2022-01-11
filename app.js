let snake = {
  body: [
    [50, 47],
    [50, 48],
    [50, 49],
    [50, 50],
  ],
  nextDirection: [1, 0],
};

let gameState = {
  apple: [11, 8],
  snake: snake,
};

let snakeDirection = {
  up: true,
  down: true,
  left: false,
  right: true,
};

let speed = 1000;

let scoreTotal = 0;

// global Elements
const board = document.querySelector("#gameBoard");
const score = document.querySelector("#ScoreTotal");
const startButton = document.getElementById("startButton")

//---------------Helper Functions----------------------------
function removeTailClass() {
  const element = snake.body[0];
  const row = element[0];
  const column = element[1];
  const cell = document.getElementById(`${row},${column}`);
  cell.classList.remove("snake");
}

function removeAppleClass() {
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

function randomizeApple() {
  let apple = gameState.apple;
  apple[0] = getRandomNum(0, 99);
  apple[1] = getRandomNum(0, 99);
}

const headInBody = (head) => {
    let index = snake.body.length
    while (index--){
        if (snake.body[index][0] === head[0] && snake.body[index][1] === head[1]){
            return true;
        }
    }
    return false;
}

const increaseScore = () => {
    scoreTotal++
    score.textContent = scoreTotal
}
//-----------------Make Board--------------------------------
// row = index = y
// column = index2 = x

function makeBoard() {
  for (let index = 0; index < 100; index++) {
    for (let index2 = 0; index2 < 100; index2++) {
      const cell = document.createElement("div");
      cell.id = [index, index2];
      board.appendChild(cell);
    }
  }
}

// ---------------- Update State-------------------------------

const gameLoop = setInterval(tick, 1000 / 30);
makeBoard();

function tick() {
  fruits();
  renderSnake();
  snakeMovement();
  gameOver();
}

//-------------------Render Game--------------------------------

function renderSnake() {
  for (let index = 0; index < snake.body.length; index++) {
    const element = snake.body[index];
    const row = element[0];
    const column = element[1];
    const cell = document.getElementById(`${row},${column}`);
    cell.classList.add("snake");
  }
}

function fruits() {
  const element = gameState.apple;
  const row = element[0];
  const column = element[1];
  const fruit = document.getElementById(`${row},${column}`);
  fruit.classList.add("apple");
}

function gameOver() {
  const index = snake.body.length - 1;
  const head = snake.body[index];
  if (head[0] > 99 || head[0] < 0) {
    clearInterval(gameLoop);
  } else if (head[1] > 99 || head[1] < 0) {
    clearInterval(gameLoop);
  }
}

//---------------------Actions done in Game -----------------------------

function snakeMovement() {
  const dirColumn = snake.nextDirection[0];
  const dirRow = snake.nextDirection[1];
  const index = snake.body.length - 1;
  const head = snake.body[index];
  const newHead = [head[0] + dirRow, head[1] + dirColumn];
  const apple = gameState.apple;
  if (apple[0] === head[0] && apple[1] === head[1]) {
    snake.body.push(newHead);
    removeTailClass();
    removeAppleClass();
    randomizeApple();
    increaseScore();
  } else if (headInBody(newHead)){
      clearInterval(gameLoop)
    } else {
        snake.body.push(newHead);
        removeTailClass();
        snake.body.shift();
    }
}

document.addEventListener("keydown", (event) => {
  let input = snake.nextDirection;

  if ((event.code === "ArrowUp" || event.code === "KeyW") && snakeDirection.up === true) {
    input[0] = 0;
    input[1] = -1;
    snakeDirection.down = false;
    snakeDirection.right = true;
    snakeDirection.left = true;
  } else if ((event.code === "ArrowDown" || event.code === "KeyS") && snakeDirection.down === true) {
    input[0] = 0;
    input[1] = 1;
    snakeDirection.up = false;
    snakeDirection.right = true;
    snakeDirection.left = true;
  } else if ((event.code === "ArrowLeft" || event.code === "KeyA") && snakeDirection.left === true) {
    input[0] = -1;
    input[1] = 0;
    snakeDirection.right = false;
    snakeDirection.down = true;
    snakeDirection.up = true;
  } else if ((event.code === "ArrowRight" || event.code === "KeyD") && snakeDirection.right === true) {
    input[0] = 1;
    input[1] = 0;
    snakeDirection.left = false;
    snakeDirection.down = true;
    snakeDirection.up = true;
  }
});

startButton.addEventListener('click', ()=>{
    location.reload();
})