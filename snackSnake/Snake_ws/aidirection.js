let aiDirection = {x: 0, y: -1};

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