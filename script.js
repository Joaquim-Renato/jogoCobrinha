const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let snakeLength = 1;
let food = { x: 0, y: 0 };
let dx = scale;
let dy = 0;
let score = 0;

function setup() {
    snake[0] = { x: canvas.width / 2, y: canvas.height / 2 };
    placeFood();
    document.addEventListener('keydown', changeDirection);
    setInterval(gameLoop, 100);
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        resetGame();
    }
    if (checkFoodCollision()) {
        snakeLength++;
        score++;
        placeFood();
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (snake.length > snakeLength) {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && dx === 0) {
        dx = -scale;
        dy = 0;
    } else if (key === 38 && dy === 0) {
        dx = 0;
        dy = -scale;
    } else if (key === 39 && dx === 0) {
        dx = scale;
        dy = 0;
    } else if (key === 40 && dy === 0) {
        dx = 0;
        dy = scale;
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * columns) * scale;
    food.y = Math.floor(Math.random() * rows) * scale;
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function resetGame() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    snakeLength = 1;
    dx = scale;
    dy = 0;
    score = 0;
    placeFood();
}

setup();
