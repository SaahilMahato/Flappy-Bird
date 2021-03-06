const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    if (gameState.current === gameState.gameOver) {
        pipes.reset();
        bird.reset();
        scoreBoard.reset();
        gameState.current = gameState.getReady;
    }
    else if (gameState.current === -1) {
        gameState.current = gameState.getReady;
        gameLoop();
    }
});