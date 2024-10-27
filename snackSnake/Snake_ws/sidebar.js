let AIScore = 0;

function startGame () {
    // 将开始游戏按钮设为程序入口
    updateParameters();
    window.requestAnimationFrame(main);
}

function selectLevel() {
    const level = document.getElementById("levelSelect").value;
    walls = levels[level];
}

function updateScoreDisplay() {
    updatePlayerScore();
}

const updateParameters = () => {
    // 刷新两个游戏启动暂停参数
    GameStarter = true;
    gameOver = false;
    selectLevel()
    ResetSnake();
    ResetLevel();
    Food = getRandomFoodPosition();
}



