const SNAKE_SPEED = 5;

let snakeBody = [
    {x:11, y:11},  // head
    {x:11, y:10},
    {x:11, y:9}
];

const updateSnake = () => {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        snakeBody[i+1] = {...snakeBody[i]};
    }

    const updateDirection = getInputDirection();
    snakeBody[0].x += updateDirection.x;
    snakeBody[0].y += updateDirection.y;

}

const drawSnake = (gameBoard) => {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add("snake");
        
        gameBoard.appendChild(snakeElement);
    }
}

const onSnake = (foodPosition) => {
    for (let i = 0; i < snakeBody.length; i++) {
        if(equalPositions(foodPosition, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

const expandSnake = (rate) => {
    for (let i = 0; i < rate; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
}

const isGameOver = () => {
    return isSnakeOutOfBounds() || isSnakeTouchingItself();
}

const isSnakeOutOfBounds = () => {
    return isOutOfBounds(snakeBody[0]);
}

const isSnakeTouchingItself = () => {
    const snakehead = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++) {
        if(equalPositions(snakehead, snakeBody[i])) {
            return true;
        }
    }
    return false;
}
