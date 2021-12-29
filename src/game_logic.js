// below classes contains the coordinates and size of all assets as their attributes in sprite.png
// also contains a draw method that draws it in the canvas

class BackGround {
    constructor() {
        this.sX = 0;
        this.sY = 0;
        this.w = 275;
        this.h = 226;
        this.x = 0;
        this.y = canvas.height - 226;
    }

    draw = () => {
        // repeatedly draw to fill the viewport
        for (let i = 0; i < 3; i++)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + i * this.w, 
                this.y, this.w, this.h);
    }
}

class ForeGround {
    constructor() {
        this.sX = 276;
        this.sY = 0;
        this.w = 224;
        this.h = 112;
        this.x = 0;
        this.y = canvas.height - 112;
        this.dx = 2;
    }

    draw = () => {
        // repeatedly draw to fill the viewport
        for (let i = 0; i < 4; i++)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + i * this.w, 
                this.y, this.w, this.h);

    }

    update = () => {
        if (gameState.current === gameState.game) {
            this.x = (this.x - this.dx) % (this.w / 2); // restore foreground position after
        }
    }
}

class GetReady {
    constructor() {
        this.sX = 0;
        this.sY = 228;
        this.w = 173;
        this.h = 152;
        this.x = canvas.width/2 - 173/2;
        this.y = 80;
    }

    draw = () => {
        if (gameState.current === gameState.getReady)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, 
                this.y, this.w, this.h);
    }
}

class GameOver {
    constructor() {
        this.sX = 175;
        this.sY = 228;
        this.w = 225;
        this.h = 202;
        this.x = canvas.width/2 - 225/2;
        this.y = 80;
    }

    draw = () => {
        if (gameState.current === gameState.gameOver)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, 
                this.y, this.w, this.h);
    }
}

class Bird {
    constructor() {
        /* animationArray contains the coordinates of the 3 states of birds in the sprite
           We need this array to animate the bird by changing images of the bird
           Also the 2nd and 4th coordinates are same because we need to animate the
           bird by reversing the images back and forth */

        this.animationArray = [
            { sX: 276, sY: 112 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 },
        ],
        this.x = 50;
        this.y = canvas.height / 2 - 50;
        this.w = 34;
        this.h = 26;
        this.imageFrame = 0;
        this.gravity = 0.1; // tuned by hit and trial
        this.jump = 2.0; // tuned by hit and trial
        this.speed = 0;
        this.rotation = 0;
    }

    draw = () => {
        let birdState = this.animationArray[this.imageFrame]; // change bird image based on frame to animate
        ctx.save(); // save context state
        ctx.translate(this.x, this.y); // translate context to postion of the bird
        ctx.rotate(this.rotation); // rotate context
        ctx.drawImage(sprite, birdState.sX, birdState.sY,
            this.w, this.h, - this.w/2, 
            - this.h/2, this.w, this.h);
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
            this.speed = 0;
            this.rotation = 0 * Math.PI / 180;
        }
        else {
            this.speed += this.gravity; // increment speed by gravity per frame
            this.y += this.speed; // increment y by speed per frame

            if (this.y + this.h/2 >= canvas.height - 112) { // check if the bird touches the ground. 112 is height of ground
                this.y = canvas.height - 112 - this.h/2; // make the bird keep touching the ground
                if (gameState.current === gameState.game) {
                    gameState.current = gameState.gameOver; // end game
                }
            }

            if (this.speed >= this.jump) {
                this.rotation = 90 * Math.PI / 180; // Math.PI / 180 coverts to degrees
                this.frame = 1;
            }
            else {
                this.rotation = -45 * Math.PI / 180; // Math.PI / 180 coverts to degrees
            }
        }
    }

    flap = () => {
        // decreasing speed makes the bird move upward since y will be negative
        this.speed = - this.jump;
    }
}

class Pipes {
    constructor() {
        this.topPipe = { sX: 553, sY: 0};
        this.bottomPipe = { sX: 502, sY: 0};
        this.w = 53;
        this.h = 400;
        this.gap = 85;
        this.dx = 2;
        this.maxYPosition = -150;
    }

    draw = () => {

    }

    update = () => {

    }
}