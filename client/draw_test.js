class DrawTest {
    constructor() {
        this.drawTestArray = [];

        this.drawTestArray.push(new BoxCustom(0, -2000, 200, 2048, 1024, 512));
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
        this.textureXMinus = grassTexture;
        this.textureXPlus = grassTexture;
        this.textureYMinus = grassTexture;
        this.textureYPlus = grassTexture;
        this.textureZMinus = grassTexture;
        this.textureZPlus = grassTexture;

        this.textureXPlusScaleWidth = this.textureXPlus.width * (this.sizeY / this.textureXPlus.width) * textureScale;
        this.textureXPlusScaleHeight = this.textureXPlus.height * (this.sizeZ / this.textureXPlus.height) * textureScale;

        this.textureYPlusScaleWidth = this.textureYPlus.width * (this.sizeX / this.textureYPlus.width) * textureScale;
        this.textureYPlusScaleHeight = this.textureYPlus.height * (this.sizeZ / this.textureYPlus.height) * textureScale;

        this.textureZPlusScaleWidth = this.textureZPlus.width * (this.sizeY / this.textureZPlus.width) * textureScale;
        this.textureZPlusScaleHeight = this.textureZPlus.height * (this.sizeX / this.textureZPlus.height) * textureScale;

        this.textureXMinusScaleWidth = this.textureXMinus.width * (this.sizeY / this.textureXMinus.width) * textureScale;
        this.textureXMinusScaleHeight = this.textureXMinus.height * (this.sizeZ / this.textureXMinus.height) * textureScale;

        this.textureYMinusScaleWidth = this.textureYMinus.width * (this.sizeX / this.textureYMinus.width) * textureScale;
        this.textureYMinusScaleHeight = this.textureYMinus.height * (this.sizeZ / this.textureYMinus.height) * textureScale;

        this.textureZMinusScaleWidth = this.textureZMinus.width * (this.sizeY / this.textureZMinus.width) * textureScale;
        this.textureZMinusScaleHeight = this.textureZMinus.height * (this.sizeX / this.textureZMinus.height) * textureScale;
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