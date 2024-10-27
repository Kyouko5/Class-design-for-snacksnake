let lastRenderTime = 0;


const main = (currenttTime) => {
  // callback: 当需要更新动画以进行下一次重新绘制时，将调用此函数。此回调函数传递一个参数timespan
  // 表示前一帧渲染的结束时间
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currenttTime - lastRenderTime)/1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED){
    return;
  }
  lastRenderTime = currenttTime;

  update();
  draw();
};

// TODO: Make the game loop run 5 times per second
// Hint: Check the setInterval documentation for additional arguments
// https://developer.mozilla.org/en-US/docs/Web/API/setInterval
window.requestAnimationFrame(main);

const update = () => {
    console.log("111");
    updateSnake();
};

const draw = () => {
    drawSnake();
};
