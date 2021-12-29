// below classes contains the coordinates and size of all assets as their attributes in sprite.png
// also contains a draw method that draws it in the canvas

class BackGround {
    constructor() {
        this.spriteX = 0;
        this.spriteY = 0;
        this.width = 275;
        this.height = 226;
        this.x = 0;
        this.y = canvas.height - 226;
    }

    draw = () => {
        // repeatedly draw to fill the viewport
        for (let i = 0; i < 3; i++)
            ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x + i * this.width, 
                this.y, this.width, this.height);
    }
}

class ForeGround {
    constructor() {
        this.spriteX = 276;
        this.spriteY = 0;
        this.width = 224;
        this.height = 112;
        this.x = 0;
        this.y = canvas.height - 112;
        this.dx = 2;
    }

    draw = () => {
        // repeatedly draw to fill the viewport
        for (let i = 0; i < 4; i++)
            ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x + i * this.width, 
                this.y, this.width, this.height);

    }

    update = () => {
        if (gameState.current === gameState.game) {
            this.x = (this.x - this.dx) % (this.width / 2); // restore foreground position after
        }
    }
}

class GetReady {
    constructor() {
        this.spriteX = 0;
        this.spriteY = 228;
        this.width = 173;
        this.height = 152;
        this.x = canvas.width/2 - 173/2;
        this.y = 80;
    }

    draw = () => {
        if (gameState.current === gameState.getReady)
            ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x, 
                this.y, this.width, this.height);
    }
}

class GameOver {
    constructor() {
        this.spriteX = 175;
        this.spriteY = 228;
        this.width = 225;
        this.height = 172;
        this.x = canvas.width/2 - 225/2;
        this.y = 80;
    }

    draw = () => {
        if (gameState.current === gameState.gameOver)
            ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x, 
                this.y, this.width, this.height);
    }
}

class Bird {
    constructor() {
        /* animationArray contains the coordinates of the 3 states of birds in the sprite
           We need this array to animate the bird by changing images of the bird
           Also the 2nd and 4th coordinates are same because we need to animate the
           bird by reversing the images back and forth */

        this.animationArray = [
            { spriteX: 276, spriteY: 112 },
            { spriteX: 276, spriteY: 139 },
            { spriteX: 276, spriteY: 164 },
            { spriteX: 276, spriteY: 139 },
        ],
        this.x = 50;
        this.y = canvas.height / 2 - 50;
        this.width = 34;
        this.height = 26;
        this.imageFrame = 0;
        this.gravity = 0.07; // tuned by hit and trial
        this.jump = 2.5; // tuned by hit and trial
        this.speed = 0;
        this.rotation = 0;
        this.radius = 12;
        this.fallAngle = 1;
    }

    draw = () => {
        let birdState = this.animationArray[this.imageFrame]; // change bird image based on frame to animate
        ctx.save(); // save context state
        ctx.translate(this.x, this.y); // translate context to postion of the bird
        ctx.rotate(this.rotation); // rotate context
        ctx.drawImage(sprite, birdState.spriteX, birdState.spriteY,
            this.width, this.height, - this.width/2, 
            - this.height/2, this.width, this.height);
        ctx.restore(); // restore context state
    }

    update = () => {
        // flapTime means the number of frames it takes before the bird flaps its wings
        this.flapTime = gameState.current === gameState.getReady ? 50: 25; // set flapTime based on game state
        if (frames % this.flapTime === 0) // increment imageFrame index once a flaptime passes
            this.imageFrame += 1
        this.imageFrame = this.imageFrame % this.animationArray.length; // make sure imageFrame never exceeds animation array index

        if (gameState.current === gameState.getReady) { // if gameState ready reset the bird position and speed
            this.y = canvas.height / 2 - 50;
            this.rotation = 0 * Math.PI / 180;
        }
        else {
            this.speed += this.gravity; // increment speed by gravity per frame
            this.y += this.speed; // increment y by speed per frame

            if (this.y + this.height/2 >= canvas.height - 112) { // check if the bird touches the ground. 112 is height of ground
                this.y = canvas.height - 112 - this.height/2; // make the bird keep touching the ground
                if (gameState.current === gameState.game) {
                    gameState.current = gameState.gameOver; // end game
                }
            }

            if (this.speed >= this.jump) {
                this.rotation = this.fallAngle * Math.PI / 180; // Math.PI / 180 coverts to degrees
                this.frame = 1;
                if (this.fallAngle < 90) this.fallAngle += 2;
            }
            else {
                this.rotation = -45 * Math.PI / 180; // Math.PI / 180 coverts to degrees
                this.fallAngle = 1;
            }
        }
    }

    flap = () => {
        // decreasing speed makes the bird move upward since y will be negative
        this.speed = - this.jump;
    }

    // reset attributes after game over
    reset = () => {
        this.speed = 0;
        this.fallAngle = 1;
    }
}

class Pipes {
    constructor() {
        this.position = []; // stores x position of the pipes
        this.topPipe = { spriteX: 553, spriteY: 0 }; // coordiante of top pipe in the sprite
        this.bottomPipe = { spriteX: 502, spriteY: 0}; // coordiante of bottom pipe in the sprite
        this.width = 53;
        this.height = 400;
        this.gap = 150; // gap between top pipe and bottom pipe 
        this.dx = 2; // speed of pipe
        this.minYPosition = -150; // minimum y position of top pipe
    }

    draw = () => {
        for (let i=0; i < this.position.length; i++) { // loop over positions
            let p = this.position[i];

            let topYPosition = p.y; // postion of top pipe
            let bottomYPosition = p.y + this.height + this.gap; // position of bottom pipe = length of top pipe + gap

            // draw top tipe
            ctx.drawImage(sprite, this.topPipe.spriteX, this.topPipe.spriteY,
                this.width, this.height, p.x, 
                topYPosition, this.width, this.height);

            // draw bottom tipe
            ctx.drawImage(sprite, this.bottomPipe.spriteX, this.bottomPipe.spriteY,
                this.width, this.height, p.x, 
                bottomYPosition, this.width, this.height);
        }
    }

    // spawn pipes
    spawn = () => {
        if (gameState.current !== gameState.game) return; // if not game state then dont spawn

        if (frames % 100 === 0) { // spawn every 100 frame
            this.position.push({
                x: canvas.width, // spawn at  right side of canvas
                y: this.minYPosition * (Math.random() + 1) // randomly generate y position
            });
        }
    }

    checkCollision = (p) => {
        if (gameState.current !== gameState.game) return;
        let bottomPipeYPosition = p.y + this.height + this.gap;
        return (
            ( // check for top pipe
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.width &&
                bird.y + bird.radius > p.y &&
                bird.y - bird.radius < p.y + this.height
            ) ||
            ( // check for bottom pipe
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.width &&
                bird.y + bird.radius > bottomPipeYPosition &&
                bird.y - bird.radius < bottomPipeYPosition + this.height
            )
        );
    }

    // move and deletes pipes if crossed left of canvas
    update = () => {
        if (gameState.current !== gameState.game) return;
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            // Collision resolution
            if (this.checkCollision(p)) {
                gameState.current = gameState.gameOver;
            }

            p.x -= this.dx; // move pipe to the left

            if (p.x + this.width <= 0) { // if pipe crossed left of viewport
                this.position.shift(); // shits array to the left by 1. basically deletes first element
                scoreBoard.currentScore++; // increase score if pipe is deleted
                scoreBoard.highScore = Math.max(scoreBoard.currentScore, scoreBoard.highScore); // set high score to max of current score and high score
                localStorage.setItem('highScore', scoreBoard.highScore); // save high score to local storage
            }
        }
    }

    // reset attributes after game over
    reset = () => {
        this.position = [];
    }
}

class ScoreBoard {
    constructor() {
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0; // Try getting score from local storage if not set to 0
        this.currentScore = 0;
    }

    draw = () => {
        ctx.fillStyle = 'white';

        if (gameState.current === gameState.game) {
            ctx.font = '48px comic-sans';
            ctx.fillText('SCORE: ' + this.currentScore, canvas.width/2 -100, 50); // apply text
            ctx.strokeText('SCORE: ' + this.currentScore, canvas.width/2 -100, 50); // apply text style
        }
        else if (gameState.current === gameState.gameOver) {
            ctx.font = '26px comic-sans';
            ctx.fillText(this.currentScore,  460, 175);
            ctx.strokeText(this.currentScore, 460, 175);
            ctx.fillText(this.highScore, 465, 215);
            ctx.strokeText(this.highScore, 465, 215);
        }
    }

    // reset attributes after game over
    reset = () => {
        this.currentScore = 0;
    }
}