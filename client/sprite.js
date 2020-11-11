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
    constructor(x, y, z, texture) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.texture = texture;

        switch (texture) {
            case sm64treeTexture:
                this.width = 250;
                this.height = 500;
                this.offsetZ = -230;
                this.followLeftRight = true;
                this.followUpDown = false;
                break;
            case polyTexture:
                this.width = 500;
                this.height = 1000;
                this.offsetZ = -250;
                this.followLeftRight = true;
                this.followUpDown = false;
                break;
            case rabbitSprite:
                this.width = 100;
                this.height = 100;
                this.offsetZ = -35;
                this.followLeftRight = true;
                this.followUpDown = false;
                break;
            default:
                this.width = 0;
                this.height = 0;
                this.offsetZ = 0;
                this.followLeftRight = false;
                this.followUpDown = false;
        }

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