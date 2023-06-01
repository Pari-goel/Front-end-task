import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 1

export function update() {
  //if food on top of the snake
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE) //snake expanded
    food = getRandomFoodPosition() 
    if(score>highscoreval){
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscoreBox.innerHTML = "HighScore: " + highscoreval;
  }
  scoreBox.innerHTML = "Score: " + score;
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}