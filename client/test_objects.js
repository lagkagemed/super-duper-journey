function initTestBoxes(){
    ground = Platform(0, 0, 13, 5000, 2000, 5, "GREEN", grassTexture);

    plat1 = Platform(0, 1300, 13, 200, 200, 5, "GREEN", grassTexture);

    plat2 = Platform(0, 1700, 13, 200, 200, 5, "GREEN", grassTexture);

    plat3 = Platform(0, 2100, 13, 200, 200, 5, "GREEN", grassTexture);

    plat4 = Platform(0, 300, -100, 200, 200, 5, "Orange", grassTexture);
    
    // Green Box
    box1 = Platform(0, -100, 0, 500, 100, 20, "LightGreen", grassTexture);

    box2 = Platform(0, -100, -400, 500, 100, 20, "LightGreen", grassTexture);

    // Yellow Box
    box3 = Platform(0, 0, 0, 500, 100, 20, "Yellow", grassTexture);

    box4 = Platform(0, 0, -400, 500, 100, 20, "Yellow", grassTexture);

    // Blue Box
    box5 = Platform(0, 100, 0, 500, 100, 20, "Blue", grassTexture);

    box6 = Platform(0, 100, -400, 500, 100, 20, "Blue", grassTexture);

    // Purple Box
    box7 = Platform(0, 160, -200, 500, 20, 420, "Purple", grassTexture);

    box8 = Platform(0, -160, -200, 500, 20, 420, "Purple", grassTexture);
}

function drawTestObjects() {
    // Human
    push();
    fill("RED");
    translate(0, -400, 0);
    scale(23);
    rotateX(-HALF_PI);
    rotateY(-PI);
    model(humanModel);
    pop();

    // push();
    // texture(sm64treeTexture);
    // translate(0, 600, -320);
    // let playerDir = createVector(lookX, lookY);
    // rotateX(HALF_PI);
    // rotateY(HALF_PI + PI + playerDir.heading());
    // plane(350, 700);
    // pop();

    // push();
    // texture(polyTexture);
    // translate(500, 800, -250);
    // playerDir = createVector(lookX, lookY);
    // rotateX(HALF_PI);
    // rotateY(HALF_PI + PI + playerDir.heading());
    // plane(1000, 1000);
    // pop();
}