import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

let score = 0;
let highScore = 0;

let speed = 10;

// Score and High Score elements
const scoreElement = document.getElementById("scoreBox");
const highScoreElement = document.getElementById("highscoreBox");

// Update the score and high score
function updateScore() {
    scoreElement.textContent = score.toString();
    highScoreElement.textContent = highScore.toString();
}

function main(currentTime) {
  if (gameOver) {

    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    score = 0; 
    return
  }


  window.requestAnimationFrame(main)
  //to check if seconds since our last render is less than time bw renders
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}





window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}