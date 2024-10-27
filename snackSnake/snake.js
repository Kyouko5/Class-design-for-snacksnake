const SNAKE_SPEED = 5;
const snakeBody = [
    {x:11, y:11},  // head
    {x:11, y:10},
    {x:11, y:9}
];

const updateSnake = () => {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        snakeBody[i+1] = {...snakeBody[i]};
    }
}

const drawSnake = () => {

}