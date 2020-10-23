class DrawTest {
    constructor() {
        this.drawTestArray = [];

        this.drawTestArray.push(new Floor(100, 200, -200, -200, -50, 100, testTexture));
        this.drawTestArray.push(new Floor(100, 200, -200, -200, -300, 100, testTexture));

        this.drawTestArray.push(new Wall(100, 200, 100, -200, -50, 250, testTexture));
        this.drawTestArray.push(new Wall(100, -200, -200, -300, -50, 250, testTexture));
        this.drawTestArray.push(new Wall(-200, 300, 100, 200, -50, 250, testTexture));
    }

    draw() {
        for (let i = 0; i < this.drawTestArray.length; i++) {
            this.drawTestArray[i].draw();
        }
    }
}

// TODO BB 2020-10-18. Texture for Floor and Wall is not rotated right.
// TODO BB 2020-10-18. Light Normals are not right for Floor and Wall.

class Floor {
    constructor(xTopLeft, yTopLeft, xBottomRight, yBottomRight, z, bottomOffset, texture) {
        this.xTopLeft = xTopLeft;
        this.yTopLeft = yTopLeft;
        this.xBottomRight = xBottomRight;
        this.yBottomRight = yBottomRight;
        this.z = z;
        this.bottomOffset = bottomOffset;
        this.texture = texture;

        let width = yBottomRight - yTopLeft;
        this.textureScaleWidth = texture.width * (width / texture.width);
        this.textureScaleOffset = texture.width * (bottomOffset / texture.width);
        let height = xBottomRight - xTopLeft;
        this.textureScaleHeight = texture.height * (height / texture.height);
    }

    draw() {
        push();

        texture(this.texture);

        // translate(0, 0, this.z);

        // rotateX(PI);

        // Shape
        // ( 1, 1) -- ( 1,-1)
        // |        /       |
        // |       /        |
        // (-1, 1) -- (-1,-1)

        beginShape(TRIANGLES);
        vertex(this.xTopLeft, this.yTopLeft, this.z, this.textureScaleWidth, 0); // Top Left
        vertex(this.xTopLeft, this.yBottomRight, this.z, 0, 0); // Top Right
        vertex(this.xBottomRight, this.yTopLeft + this.bottomOffset, this.z, this.textureScaleWidth - this.textureScaleOffset, this.textureScaleHeight); // Bottom Left

        vertex(this.xBottomRight, this.yTopLeft + this.bottomOffset, this.z, this.textureScaleWidth - this.textureScaleOffset, this.textureScaleHeight); // Bottom Left
        vertex(this.xTopLeft, this.yBottomRight, this.z, 0, 0); // Top Right
        vertex(this.xBottomRight, this.yBottomRight - this.bottomOffset, this.z, this.textureScaleOffset, this.textureScaleHeight); // Bottom Right
        endShape();

        pop();
    }
}

class Wall {
    constructor(xLeft, yLeft, xRight, yRight, z, height, texture) {
        this.xLeft = xLeft;
        this.yLeft = yLeft;
        this.xRight = xRight;
        this.yRight = yRight;
        this.z = z;
        this.height = height;
        this.texture = texture;

        let width = dist(xLeft, yLeft, xRight, yRight);
        this.textureScaleWidth = texture.width * (width / texture.width);
        this.textureScaleHeight = texture.height * (height / texture.height);
    }

    draw() {
        push();

        texture(this.texture);

        // translate(0, 0, this.z);

        // rotateX(PI);

        // Shape
        // ( 1, 1) -- ( 1,-1)
        // |        /       |
        // |       /        |
        // (-1, 1) -- (-1,-1)

        beginShape(TRIANGLES);
        vertex(this.xLeft, this.yLeft, this.z - this.height, this.textureScaleWidth, 0);
        vertex(this.xRight, this.yRight, this.z - this.height, 0, 0);
        vertex(this.xLeft, this.yLeft, this.z, this.textureScaleWidth, this.textureScaleHeight);

        vertex(this.xLeft, this.yLeft, this.z, this.textureScaleWidth, this.textureScaleHeight);
        vertex(this.xRight, this.yRight, this.z - this.height, 0, 0);
        vertex(this.xRight, this.yRight, this.z, 0, this.textureScaleHeight);
        endShape();

        pop();
    }
}