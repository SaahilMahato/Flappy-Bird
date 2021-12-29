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
const pipes = new Pipes();
const scoreBoard = new ScoreBoard();

// control game state
const gameState = {
    current: -1, // no state before initialization
    getReady: 0,
    game: 1,
    gameOver: 2
}

// perform after click
canvas.addEventListener('click', (e) => {
    switch (gameState.current) {
        case gameState.getReady:
            gameState.current = gameState.game;
            break;
        case gameState.game:
            bird.flap();
            break;
    }
});

// draw objects
const draw = () => {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
    backGround.draw();
    pipes.draw();
    foreGround.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    scoreBoard.draw();
}

// update update positions and animations
const update = () => {
    bird.update();
    foreGround.update();
    pipes.spawn();
    pipes.update();
}

// game loop that runs the game
const gameLoop = () => {
    update();
    draw();
    frames++;
    requestAnimationFrame(gameLoop);
}