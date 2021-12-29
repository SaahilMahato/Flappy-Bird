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
    }

    draw = () => {
        // repeatedly draw to fill the viewport
        for (let i = 0; i < 4; i++)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + i * this.w, 
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
        this.frame = 0;
    }

    draw = () => {
        let birdState = this.animationArray[this.frame]; // change bird image based on frame to animate
        ctx.drawImage(sprite, birdState.sX, birdState.sY,
            this.w, this.h, this.x - this.w/2, 
            this.y - this.h/2, this.w, this.h);
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
        this.y = 90;
    }

    draw = () => {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, 
            this.y, this.w, this.h);
    }
}