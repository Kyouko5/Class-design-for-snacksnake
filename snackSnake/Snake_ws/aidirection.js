let aiDirection = {x: 1, y: 0};

const SimpleAIDirection = () => {
    const aiHead = AIsnakeBody[0];

    // 基本AI策略: 朝着食物方向移动
    if (Food.x > aiHead.x && aiDirection.x !== -1) {
        aiDirection = { x: 1, y: 0 };
    } else if (Food.x < aiHead.x && aiDirection.x !== 1) {
        aiDirection = { x: -1, y: 0 };
    } else if (Food.y > aiHead.y && aiDirection.y!== -1) {
        aiDirection = { x: 0, y: 1 };
    } else if (Food.y < aiHead.y && aiDirection.y!== 1) {
        aiDirection = { x: 0, y: -1 };
    }

    return aiDirection;
}


// A* 算法会计算从蛇头到食物的路径。使用曼哈顿距离作为启发函数，保证 AI 尽可能找到最短路径。
const heuristic = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// 为当前节点获取可访问的相邻节点（上下左右方向），并确保在网格边界内。
const getNeighbors = (node) => {
    const directions = [
        { x: -1, y: 0 }, // 上
        { x: 1, y: 0 },  // 下
        { x: 0, y: -1 }, // 左
        { x: 0, y: 1 }   // 右
    ];
    let neighbors = [];
    for (let dir of directions) {
        let x = node.x + dir.x;
        let y = node.y + dir.y;
        if (x > 1 && x < GRID_SIZE-1 && y > 1 && y < GRID_SIZE-1) {
            neighbors.push({ x, y });
        }
    }
    return neighbors;
}

const aStar = (start, goal) =>{
    let openSet = [start];
    let cameFrom = {};
    let gScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));
    gScore[start.x][start.y] = 0;
    let fScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));
    fScore[start.x][start.y] = heuristic(start, goal);

    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a.x][a.y] - fScore[b.x][b.y]);
        let current = openSet.shift();

        // 找到路径，回溯路径
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            return path.reverse(); // 返回路径
        }

        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            if (grid[neighbor.x][neighbor.y] === 1) continue; // 跳过不可通行节点
            let tentative_gScore = gScore[current.x][current.y] + 1;

            if (tentative_gScore < gScore[neighbor.x][neighbor.y]) {
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                gScore[neighbor.x][neighbor.y] = tentative_gScore;
                fScore[neighbor.x][neighbor.y] = tentative_gScore + heuristic(neighbor, goal);
                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return null; // 无路径可用
}

// 将食物的位置设为目标，每次移动时重新计算路径，逐步让 AI 蛇按照路径移动。
const moveAISnake = () => {
    initializeGrid(); // 初始化网格，更新蛇和墙的位置
    let head = AIsnakeBody[0];
    let path = aStar(head, Food); // 计算路径

    if (path && path.length > 1) {
        // AIsnakeBody.unshift(path[1]); // 移动到路径的下一个节点
        // AIsnakeBody.pop(); // 删除尾部，使蛇长度保持不变
        return path[1]; // 新位置
    } else {
        console.log("没有路径可行！AI 停止移动");
    }
}
