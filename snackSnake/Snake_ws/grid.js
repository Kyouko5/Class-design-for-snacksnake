const GRID_SIZE = 39;


const getRandomPosition = () => {
    return {x:Math.floor(Math.random() * (GRID_SIZE) + 1), 
            y: Math.floor(Math.random() * (GRID_SIZE) + 1)
        };
}

const isOutOfBounds = (position) => {
    return position.x < 2 || position.x > GRID_SIZE 
        || position.y < 2 || position.y > GRID_SIZE;
}


const isTouchingWalls = (position) => {
    return walls.some(wall => wall.x === position.x 
        && wall.y === position.y);
    }