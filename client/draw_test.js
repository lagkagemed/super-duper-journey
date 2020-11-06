class DrawTest {
    constructor() {
        this.drawTestArray = [];

        // this.drawTestArray.push(new Floor(1000, 200, 700, -200, 500, 100, testTexture));
        // this.drawTestArray.push(new Floor(1000, 200, 700, -200, 250, 100, testTexture));

        // this.drawTestArray.push(new Wall(1000, 200, 1000, -200, 500, 250, testTexture));
        // this.drawTestArray.push(new Wall(1000, -200, 700, -300, 500, 250, testTexture));
        // this.drawTestArray.push(new Wall(700, 300, 1000, 200, 500, 250, testTexture));

        this.drawTestArray.push(new BoxCustom(0, -2000, -300, 512, 1024, 2048));
    }

    draw() {
        for (let i = 0; i < this.drawTestArray.length; i++) {
            this.drawTestArray[i].draw();
        }
    }
}

class BoxCustom {
    constructor(x, y, z, sizeX, sizeY, sizeZ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.sizeX = sizeX / 2;
        this.sizeY = sizeY / 2;
        this.sizeZ = sizeZ / 2;
        this.textureXMinus = testTexture3;
        this.textureXPlus = testTexture2;
        this.textureYMinus = testTexture3;
        this.textureYPlus = testTexture;
        this.textureZMinus = testTexture2;
        this.textureZPlus = testTexture;

        this.textureXPlusScaleWidth = this.textureXPlus.width * (this.sizeY / this.textureXPlus.width);
        this.textureXPlusScaleHeight = this.textureXPlus.height * (this.sizeZ / this.textureXPlus.height);

        this.textureYPlusScaleWidth = this.textureYPlus.width * (this.sizeX / this.textureYPlus.width);
        this.textureYPlusScaleHeight = this.textureYPlus.height * (this.sizeZ / this.textureYPlus.height);

        this.textureZPlusScaleWidth = this.textureZPlus.width * (this.sizeY / this.textureZPlus.width);
        this.textureZPlusScaleHeight = this.textureZPlus.height * (this.sizeX / this.textureZPlus.height);

        this.textureXMinusScaleWidth = this.textureXMinus.width * (this.sizeY / this.textureXMinus.width);
        this.textureXMinusScaleHeight = this.textureXMinus.height * (this.sizeZ / this.textureXMinus.height);

        this.textureYMinusScaleWidth = this.textureYMinus.width * (this.sizeX / this.textureYMinus.width);
        this.textureYMinusScaleHeight = this.textureYMinus.height * (this.sizeZ / this.textureYMinus.height);

        this.textureZMinusScaleWidth = this.textureZMinus.width * (this.sizeY / this.textureZMinus.width);
        this.textureZMinusScaleHeight = this.textureZMinus.height * (this.sizeX / this.textureZMinus.height);
    }

    draw() {
        push();

        translate(this.x, this.y, this.z);

        // Shape
        // ( 1, 1) -- ( 1,-1)
        // |        /       |
        // |       /        |
        // (-1, 1) -- (-1,-1)

        // Z Plus
        texture(this.textureZPlus);
        // plane(50, 50); // Test plane.
        beginShape(TRIANGLES);
        vertex(this.sizeX, this.sizeY, this.sizeZ, this.textureZPlusScaleWidth, 0); // Top Left
        vertex(this.sizeX, -this.sizeY, this.sizeZ, 0, 0); // Top Right
        vertex(-this.sizeX, this.sizeY, this.sizeZ, this.textureZPlusScaleWidth, this.textureZPlusScaleHeight); // Bottom Left
        vertex(-this.sizeX, this.sizeY, this.sizeZ, this.textureZPlusScaleWidth, this.textureZPlusScaleHeight); // Bottom Left
        vertex(this.sizeX, -this.sizeY, this.sizeZ, 0, 0); // Top Right
        vertex(-this.sizeX, -this.sizeY, this.sizeZ, 0, this.textureZPlusScaleHeight); // Bottom Right
        endShape();

        rotateY(HALF_PI);

        // X Plus
        texture(this.textureXPlus);
        beginShape(TRIANGLES);
        vertex(this.sizeZ, this.sizeY, this.sizeX, this.textureXPlusScaleWidth, 0); // Top Left
        vertex(this.sizeZ, -this.sizeY, this.sizeX, 0, 0); // Top Right
        vertex(-this.sizeZ, this.sizeY, this.sizeX, this.textureXPlusScaleWidth, this.textureXPlusScaleHeight); // Bottom Left
        vertex(-this.sizeZ, this.sizeY, this.sizeX, this.textureXPlusScaleWidth, this.textureXPlusScaleHeight); // Bottom Left
        vertex(this.sizeZ, -this.sizeY, this.sizeX, 0, 0); // Top Right
        vertex(-this.sizeZ, -this.sizeY, this.sizeX, 0, this.textureXPlusScaleHeight); // Bottom Right
        endShape();

        rotateX(-HALF_PI);

        // Y Plus
        texture(this.textureYPlus);
        beginShape(TRIANGLES);
        vertex(this.sizeZ, this.sizeX, this.sizeY, this.textureYPlusScaleWidth, 0); // Top Left
        vertex(this.sizeZ, -this.sizeX, this.sizeY, 0, 0); // Top Right
        vertex(-this.sizeZ, this.sizeX, this.sizeY, this.textureYPlusScaleWidth, this.textureYPlusScaleHeight); // Bottom Left
        vertex(-this.sizeZ, this.sizeX, this.sizeY, this.textureYPlusScaleWidth, this.textureYPlusScaleHeight); // Bottom Left
        vertex(this.sizeZ, -this.sizeX, this.sizeY, 0, 0); // Top Right
        vertex(-this.sizeZ, -this.sizeX, this.sizeY, 0, this.textureYPlusScaleHeight); // Bottom Right
        endShape();

        rotateX(-HALF_PI);

        // X Minus
        texture(this.textureXMinus);
        beginShape(TRIANGLES);
        vertex(this.sizeZ, this.sizeY, this.sizeX, this.textureXMinusScaleWidth, 0); // Top Left
        vertex(this.sizeZ, -this.sizeY, this.sizeX, 0, 0); // Top Right
        vertex(-this.sizeZ, this.sizeY, this.sizeX, this.textureXMinusScaleWidth, this.textureXMinusScaleHeight); // Bottom Left
        vertex(-this.sizeZ, this.sizeY, this.sizeX, this.textureXMinusScaleWidth, this.textureXMinusScaleHeight); // Bottom Left
        vertex(this.sizeZ, -this.sizeY, this.sizeX, 0, 0); // Top Right
        vertex(-this.sizeZ, -this.sizeY, this.sizeX, 0, this.textureXMinusScaleHeight); // Bottom Right
        endShape();

        rotateX(-HALF_PI);

        // Y Minus
        texture(this.textureYMinus);
        beginShape(TRIANGLES);
        vertex(this.sizeZ, this.sizeX, this.sizeY, this.textureYMinusScaleWidth, 0); // Top Left
        vertex(this.sizeZ, -this.sizeX, this.sizeY, 0, 0); // Top Right
        vertex(-this.sizeZ, this.sizeX, this.sizeY, this.textureYMinusScaleWidth, this.textureYMinusScaleHeight); // Bottom Left
        vertex(-this.sizeZ, this.sizeX, this.sizeY, this.textureYMinusScaleWidth, this.textureYMinusScaleHeight); // Bottom Left
        vertex(this.sizeZ, -this.sizeX, this.sizeY, 0, 0); // Top Right
        vertex(-this.sizeZ, -this.sizeX, this.sizeY, 0, this.textureYMinusScaleHeight); // Bottom Right
        endShape();

        rotateY(HALF_PI);
        rotateZ(HALF_PI);

        // Z Minus
        texture(this.textureZMinus);
        beginShape(TRIANGLES);
        vertex(this.sizeX, this.sizeY, this.sizeZ, this.textureZMinusScaleWidth, 0); // Top Left
        vertex(this.sizeX, -this.sizeY, this.sizeZ, 0, 0); // Top Right
        vertex(-this.sizeX, this.sizeY, this.sizeZ, this.textureZMinusScaleWidth, this.textureZMinusScaleHeight); // Bottom Left
        vertex(-this.sizeX, this.sizeY, this.sizeZ, this.textureZMinusScaleWidth, this.textureZMinusScaleHeight); // Bottom Left
        vertex(this.sizeX, -this.sizeY, this.sizeZ, 0, 0); // Top Right
        vertex(-this.sizeX, -this.sizeY, this.sizeZ, 0, this.textureZMinusScaleHeight); // Bottom Right
        endShape();

        pop();
    }
}

// class Floor {
//     constructor(xTopLeft, yTopLeft, xBottomRight, yBottomRight, z, bottomOffset, texture) {
//         this.xTopLeft = xTopLeft;
//         this.yTopLeft = yTopLeft;
//         this.xBottomRight = xBottomRight;
//         this.yBottomRight = yBottomRight;
//         this.z = z;
//         this.bottomOffset = bottomOffset;
//         this.texture = texture;

//         let width = yBottomRight - yTopLeft;
//         this.textureScaleWidth = texture.width * (width / texture.width);
//         this.textureScaleOffset = texture.width * (bottomOffset / texture.width);
//         let height = xBottomRight - xTopLeft;
//         this.textureScaleHeight = texture.height * (height / texture.height);
//     }

//     draw() {
//         push();

//         texture(this.texture);

//         // translate(0, 0, this.z);

//         // rotateX(PI);

//         // Shape
//         // ( 1, 1) -- ( 1,-1)
//         // |        /       |
//         // |       /        |
//         // (-1, 1) -- (-1,-1)

//         beginShape(TRIANGLES);
//         vertex(this.xTopLeft, this.yTopLeft, this.z, this.textureScaleWidth, 0); // Top Left
//         vertex(this.xTopLeft, this.yBottomRight, this.z, 0, 0); // Top Right
//         vertex(this.xBottomRight, this.yTopLeft + this.bottomOffset, this.z, this.textureScaleWidth - this.textureScaleOffset, this.textureScaleHeight); // Bottom Left

//         vertex(this.xBottomRight, this.yTopLeft + this.bottomOffset, this.z, this.textureScaleWidth - this.textureScaleOffset, this.textureScaleHeight); // Bottom Left
//         vertex(this.xTopLeft, this.yBottomRight, this.z, 0, 0); // Top Right
//         vertex(this.xBottomRight, this.yBottomRight - this.bottomOffset, this.z, this.textureScaleOffset, this.textureScaleHeight); // Bottom Right
//         endShape();

//         pop();
//     }
// }

// class Wall {
//     constructor(xLeft, yLeft, xRight, yRight, z, height, texture) {
//         this.xLeft = xLeft;
//         this.yLeft = yLeft;
//         this.xRight = xRight;
//         this.yRight = yRight;
//         this.z = z;
//         this.height = height;
//         this.texture = texture;

//         let width = dist(xLeft, yLeft, xRight, yRight);
//         this.textureScaleWidth = texture.width * (width / texture.width);
//         this.textureScaleHeight = texture.height * (height / texture.height);
//     }

//     draw() {
//         push();

//         texture(this.texture);

//         // translate(0, 0, this.z);

//         // rotateX(PI);

//         // Shape
//         // ( 1, 1) -- ( 1,-1)
//         // |        /       |
//         // |       /        |
//         // (-1, 1) -- (-1,-1)

//         beginShape(TRIANGLES);
//         vertex(this.xLeft, this.yLeft, this.z - this.height, this.textureScaleWidth, 0);
//         vertex(this.xRight, this.yRight, this.z - this.height, 0, 0);
//         vertex(this.xLeft, this.yLeft, this.z, this.textureScaleWidth, this.textureScaleHeight);

//         vertex(this.xLeft, this.yLeft, this.z, this.textureScaleWidth, this.textureScaleHeight);
//         vertex(this.xRight, this.yRight, this.z - this.height, 0, 0);
//         vertex(this.xRight, this.yRight, this.z, 0, this.textureScaleHeight);
//         endShape();

//         pop();
//     }
// }