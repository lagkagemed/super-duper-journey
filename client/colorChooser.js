let groundCol = {};
let closeToColor = false;

function initColorChooser() {
    //platforms
    groundColor = Platform(-4000, -900, 13, 3000, 200, 5, "GREY", -1);
    
    groundCol[1] = Platform(-2800, -1100, 13, 200, 200, 5, "GREEN", 0);

    groundCol[2] = Platform(-3100, -1100, 13, 200, 200, 5, "RED", 0);

    groundCol[3] = Platform(-3400, -1100, 13, 200, 200, 5, "BLUE", 0);

    groundCol[4] = Platform(-3700, -1100, 13, 200, 200, 5, "ORANGE", 0);

    groundCol[5] = Platform(-4000, -1100, 13, 200, 200, 5, "PURPLE", 0);

    groundCol[6] = Platform(-2800, -700, 13, 200, 200, 5, "Aquamarine", 0);

    groundCol[7] = Platform(-3100, -700, 13, 200, 200, 5, "Chartreuse", 0);

    groundCol[8] = Platform(-3400, -700, 13, 200, 200, 5, "DarkSlateGray", 0);

    groundCol[9] = Platform(-3700, -700, 13, 200, 200, 5, "HotPink", 0);

    groundCol[10] = Platform(-4000, -700, 13, 200, 200, 5, "SandyBrown", 0);

    groundColor2 = Platform(-3250, 0, 13, 1500, 200, 5, "GREY", -1);
    
    groundCol[11] = Platform(-2800, -200, 13, 200, 200, 5, "GREY", 1);

    groundCol[12] = Platform(-3100, -200, 13, 200, 200, 5, "GREY", 2);

    groundCol[13] = Platform(-3400, -200, 13, 200, 200, 5, "GREY", 3);

}