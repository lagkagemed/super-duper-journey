class DrawTest {
    constructor() {
        this.drawTestArray = [];

        this.drawTestArray.push(new Floor(50, 50, 50, -50, -50, 50, -50, -50, -50, testTexture));
        this.drawTestArray.push(new Floor(50, 50, 50, -50, -50, 50, -50, -50, -300, testTexture));
    }

    draw() {
        for (let i = 0; i < this.drawTestArray.length; i++) {
            this.drawTestArray[i].draw();
        }
    }
}

class Floor {
    // TODO BB 2020-10-16. Does not look right when it is a ceiling. Look into class inheritance.

    constructor(xTopLeft, yTopLeft, xTopRight, yTopRight, xBottomLeft, yBottomLeft, xBottomRight, yBottomRight, z, texture) {
        this.xTopLeft = xTopLeft;
        this.yTopLeft = yTopLeft;
        this.xTopRight = xTopRight;
        this.yTopRight = yTopRight;
        this.xBottomLeft = xBottomLeft;
        this.yBottomLeft = yBottomLeft;
        this.xBottomRight = xBottomRight;
        this.yBottomRight = yBottomRight;
        this.z = z;
        this.texture = texture;
    }

    draw() {
        push();

        texture(testTexture);

        translate(0, 0, this.z);

        rotateX(PI);

        let textureSize = 128 * 2;

        // Shape
        // ( 1, 1) -- ( 1,-1)
        // |        /       |
        // |       /        |
        // (-1, 1) -- (-1,-1)

        beginShape(TRIANGLES);
        vertex(this.xTopLeft, this.yTopLeft, 0, textureSize, 0);
        vertex(this.xTopRight, this.yTopRight, 0, 0, 0);
        vertex(this.xBottomLeft, this.yBottomLeft, 0, textureSize, textureSize);

        vertex(this.xBottomLeft, this.yBottomLeft, 0, textureSize, textureSize);
        vertex(this.xTopRight, this.yTopRight, 0, 0, 0);
        vertex(this.xBottomRight, this.yBottomRight, 0, 0, textureSize);
        endShape();

        // beginShape(TRIANGLES);
        // vertex(100, 100, 0, textureSize, 0);
        // vertex(100, -100, 0, 0, 0);
        // vertex(-100, 100, 0, textureSize, textureSize);

        // vertex(-100, 100, 0, textureSize, textureSize);
        // vertex(100, -100, 0, 0, 0);
        // vertex(-100, -100, 0, 0, textureSize);
        // endShape();

        pop();
    }
}

// function drawTestWall(x1, y1, x2, y2, z, height) {

// }