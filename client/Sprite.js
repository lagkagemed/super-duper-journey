function initTestSprites() {
    spriteArray.push(new Sprite(0, 600, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(500, 800, -500, 500, 1000, 250, polyTexture, true, false));

    spriteArray.push(new Sprite(1000, 600, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(1000, 200, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(1000, -200, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(1000, -600, -350, 350, 700, 30, sm64treeTexture, true, false));

    spriteArray.push(new Sprite(1500, 600, -500, 500, 1000, 250, polyTexture, true, false));
    spriteArray.push(new Sprite(1500, 0, -500, 500, 1000, 250, polyTexture, true, false));
    spriteArray.push(new Sprite(1500, -600, -500, 500, 1000, 250, polyTexture, true, false));

    spriteArray.push(new Sprite(2000, 600, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(2000, 200, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(2000, -200, -350, 350, 700, 30, sm64treeTexture, true, false));
    spriteArray.push(new Sprite(2000, -600, -350, 350, 700, 30, sm64treeTexture, true, false));
}

function updateTestSprites() {
    let playerDir = createVector(lookX, lookY);
    for (let i = 0; i < spriteArray.length; i++) {
        // TODO BB 2020-10-25. Implement headingUpDown.
        spriteArray[i].update(playerDir.heading(), 0);
    }
    spriteArray.sort(function (a, b) { return b.distToPlayer - a.distToPlayer });
}

function drawTestSprites() {
    for (let i = 0; i < spriteArray.length; i++) {
        spriteArray[i].draw();
    }
}

class Sprite {
    constructor(x, y, z, width, height, offsetZ, texture, followLeftRight, followUpDown) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.offsetZ = offsetZ;
        this.texture = texture;
        this.followLeftRight = followLeftRight;
        this.followUpDown = followUpDown;

        this.headingLeftRight = 0;
        this.headingUpDown = 0;

        this.distToPlayer = 0;
    }

    update(headingLeftRight, headingUpDown) {
        this.headingLeftRight = headingLeftRight;
        this.headingUpDown = headingUpDown;

        this.distToPlayer = dist(this.x, this.y, this.z + this.offsetZ, posX, posY, posZ - playerHeight);
    }

    draw() {
        push();

        texture(this.texture);

        translate(this.x, this.y, this.z + this.offsetZ);

        if (this.followLeftRight) {
            rotateX(HALF_PI);
            rotateY(HALF_PI + PI + this.headingLeftRight);
        }

        if (this.followUpDown) {
            // TODO BB 2020-10-25. Implement.
        }

        plane(this.width, this.height);

        pop();
    }
}