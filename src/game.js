// canvas and context
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// game variables and constants
let frames = 0;

// load sprite beofre. loading it during animation will cause performance issues
const sprite = new Image();
sprite.src = 'assets/sprite.png';

//create game objects
const backGround = new BackGround();
const foreGround = new ForeGround();
const getReady = new GetReady();
const gameOver = new GameOver();
const bird = new Bird();

// control game state
const gameState = {
    current: 0,
    getReady: 0,
    game: 1,
    gameOver: 2
}

canvas.addEventListener('click', (e) => {
    switch (gameState.current) {
        case gameState.getReady:
            gameState.current = gameState.game;
            break;
        case gameState.game:
            bird.flap();
            break;
        case gameState.gameOver:
            gameState.current = gameState.gameOver;
            break;
    }
})

const draw = () => {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
    backGround.draw();
    foreGround.draw();
    getReady.draw();
    gameOver.draw();
    bird.draw();
}

const update = () => {

}

const gameLoop = () => {
    update();
    draw();
    frames++;

    requestAnimationFrame(gameLoop);
}

gameLoop();