const GRID_SIZE = 40;


const getRandomPosition = () => {
    return {x:Math.floor(Math.random() * GRID_SIZE), 
            y: Math.floor(Math.random() * GRID_SIZE)
        };
}

const isOutOfBounds = (position) => {
    return position.x < 1 || position.x > GRID_SIZE 
        || position.y < 1 || position.y > GRID_SIZE;
}