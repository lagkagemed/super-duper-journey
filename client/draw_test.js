class DrawTest {
    constructor() {
        this.drawTestArray = [];

        let floor = new Floor(0, 0, 0, 0, 0, 0, 0, 0, -50, 0);
        this.drawTestArray.push(floor);
    }

    draw() {
        for (let i = 0; i < this.drawTestArray.length; i++) {
            this.drawTestArray[i].draw();
        }
    }
}

class Floor {
    constructor(xTopLeft, yTopLeft, xTopRight, yTopRight, xBottomLeft, yBottomLeft, xBottomRight, yBottomRight, z, textureHeading) {
        // static const TEXTURE_HEADING_X_MINUS = PI;
        // static const TEXTURE_HEADING_X_PLUS = 0;
        // static const TEXTURE_HEADING_Y_MINUS = HALF_PI;
        // static const TEXTURE_HEADING_Y_PLUS = -HALF_PI;

        // if (textureHeading === null)
        //     textureHeading = TEXTURE_HEADING_X_PLUS;

        this.xTopLeft = xTopLeft;
        this.yTopLeft = yTopLeft;
        this.xTopRight = xTopRight;
        this.yTopRight = yTopRight;
        this.xBottomLeft = xBottomLeft;
        this.yBottomLeft = yBottomLeft;
        this.xBottomRight = xBottomRight;
        this.yBottomRight = yBottomRight;
        this.z = z;
        this.textureHeading = textureHeading;
    }

    draw() {
        push();

        texture(testTexture);

        translate(this.xTopLeft, this.yTopLeft, this.z);

        rotateX(PI);
        rotateZ(this.textureHeading);

        let texSize = 128 * 2;

        beginShape(TRIANGLES);
        vertex(100, 100, 0, texSize, 0);
        vertex(100, -100, 0, 0, 0);
        vertex(-100, 100, 0, texSize, texSize);

        vertex(-100, 100, 0, texSize, texSize);
        vertex(100, -100, 0, 0, 0);
        vertex(-100, -100, 0, 0, texSize);
        endShape();

        

        pop();
    }
}

// function drawTestWall(x1, y1, x2, y2, z, height) {

// }