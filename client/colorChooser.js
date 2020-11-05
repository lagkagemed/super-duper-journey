let groundCol = {};
let closeToColor = false;

function initColorChooser() {
    //platforms
    groundColor = Platform(-4000, -900, 13, 3000, 200, 5, "GREY", grassTexture);
    
    groundCol[1] = Platform(-2800, -1100, 13, 200, 200, 5, "GREEN", grassTexture);

    groundCol[2] = Platform(-3100, -1100, 13, 200, 200, 5, "RED", grassTexture);

    groundCol[3] = Platform(-3400, -1100, 13, 200, 200, 5, "BLUE", grassTexture);

    groundCol[4] = Platform(-3700, -1100, 13, 200, 200, 5, "ORANGE", grassTexture);

    groundCol[5] = Platform(-4000, -1100, 13, 200, 200, 5, "PURPLE", grassTexture);

    groundCol[6] = Platform(-2800, -700, 13, 200, 200, 5, "Aquamarine", grassTexture);

    groundCol[7] = Platform(-3100, -700, 13, 200, 200, 5, "Chartreuse", grassTexture);

    groundCol[8] = Platform(-3400, -700, 13, 200, 200, 5, "DarkSlateGray", grassTexture);

    groundCol[9] = Platform(-3700, -700, 13, 200, 200, 5, "HotPink", grassTexture);

    groundCol[10] = Platform(-4000, -700, 13, 200, 200, 5, "SandyBrown", grassTexture);

    groundColor2 = Platform(-3250, 0, 13, 1500, 200, 5, "GREY", grassTexture);
    
    groundCol[11] = Platform(-2800, -200, 13, 200, 200, 5, "GREY", 1);

    groundCol[12] = Platform(-3100, -200, 13, 200, 200, 5, "GREY", 2);

    groundCol[13] = Platform(-3400, -200, 13, 200, 200, 5, "GREY", 3);

}

function testColPlayerCol(object) {

    colBoxSize = 25;

    // check if colliding
    if ((posX + colBoxSize) > (object.x - (object.width / 2))
    && (posX - colBoxSize) < (object.x + (object.width / 2))
    && (posY + colBoxSize) > (object.y - (object.depth / 2))
    && (posY - colBoxSize) < (object.y + (object.depth / 2))
    && posZ + 40 > (object.z - (object.height / 2))) {
        if (object.tex == grassTexture) myColor = object.color;
        if (object.tex == 1) myModel = 0;
        if (object.tex == 2) myModel = 1;
        if (object.tex == 3) myModel = 2;

    }
}

function testColPlayerColList() {
    for (let i in groundCol) {
        let object = groundCol[i];
        testColPlayerCol(object);
    }
}