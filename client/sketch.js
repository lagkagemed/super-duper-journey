// Spil på: http://super-duper-journey.herokuapp.com/

function updateZVel() {
    physZVel += physGravity;
    if (physZVel > physZVelMax) physZVel = physZVelMax;
    posZ += physZVel;
}

socket.on('idGranted', function (data) {
    myId = data;
    // console.log(myId);
});

function sendNewPosition() {
    let pack = [];
    pack.push({
        x: posX,
        y: posY,
        z: posZ,
        lX: lookX,
        lY: lookY
    })
    socket.emit('newPosition', pack)
    oldSumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
}

socket.on('newPositions', function (data) {
    SOCKET_LIST = data;
});

function drawPlayers() {
    for (let i = 0; i < SOCKET_LIST.length; i++) {
        if (SOCKET_LIST[i].id != myId) {
            push();
            fill("RED");
            translate(SOCKET_LIST[i].x, SOCKET_LIST[i].y, (SOCKET_LIST[i].z));
            let playerDir = createVector(SOCKET_LIST[i].lX, SOCKET_LIST[i].lY);
            scale(23);
            rotateX(-HALF_PI);
            rotateY(-playerDir.heading());
            model(humanModel);
            pop();
        }
    }
}

function testColPlayer(object) {
    if (posZ > (object.z - (object.height)) && (posZ - 50) < (object.z + (object.height)) && (posX + 50) > (object.x - (object.width / 2)) && (posX - 50) < (object.x + (object.width / 2)) && (posY + 50) > (object.y - (object.depth / 2)) && (posY - 50) < (object.y + (object.depth / 2))) {
        posZ = (object.z - (object.height));
        standing = true;
    }
}

function testColPlayerList(list) {
    for (let i in list) {
        let object = list[i];
        testColPlayer(object);
    }
}

function respawn(){
    posX = -500;
    posY = 0;
    posZ = 0;
    lookX = 1;
    lookY = 0;
    lookZ = 0;
    lookXScaled = 0;
    lookYScaled = 0;
}

function drawAllObjectsInList(list) {
    for (let i in list) {
    let object = list[i];
    object.draw();
    }
}

function preload() {
    humanModel = loadModel('./client/assets/HumanModel.obj');
    sm64treeTexture = loadImage('./client/assets/sm64tree.png');
    polyTexture = loadImage('./client/assets/Poly.png');
    grassTexture = loadImage('./client/assets/Grass.png');
    testTexture = loadImage('./client/assets/TestTexture.png');
    testTexture2 = loadImage('./client/assets/TestTexture2.png');
    buttonATexture = loadImage('./client/assets/ButtonA.png');
    buttonBTexture = loadImage('./client/assets/ButtonB.png');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('sketch-holder');

    controls = new Controls();

    initTestBoxes();

    drawTest = new DrawTest();

    textureWrap(REPEAT); // REPEAT, CLAMP
    noStroke();
    // noFill();

    // frameRate(60);
}

function windowResized() {
    // socket.emit('log', "After resize: width: " + windowWidth + ", height: " + windowHeight);
    resizeCanvas(windowWidth, windowHeight);
    controls = new Controls();
}

function update() {
    // print(frameRate());

    controls.update();

    // Movement
    let move = controls.move;
    let jump = controls.jump;
    let duck = controls.duck;
    let walkDirV = createVector(lookX, lookY);
    if (move.isMoving) {
        walkDirV.rotate(move.heading);
        if (!move.isRunning) {
            posX += walkDirV.x * spdWalk;
            posY += walkDirV.y * spdWalk;
        } else {
            posX += walkDirV.x * spdRun;
            posY += walkDirV.y * spdRun;
        }
    }
    if (jump && standing) {
        physZVel = physJump;
        standing = false;
    }
    if (!playerIsDucking && duck) {
        playerHeight = playerHeightDuck;
        //posZ -= playerHeightStand - playerHeightDuck;
        playerIsDucking = true;
    } else if (playerIsDucking && !duck) {
        playerHeight = playerHeightStand;
        //posZ += playerHeightStand - playerHeightDuck;
        playerIsDucking = false;
    }

    updateZVel();
    testColPlayerList(PLATFORM_LIST);
    if (posZ > 3000) respawn();

    // Look Direction
    let lookUpDown = controls.lookUpDown;
    let lookLeftRight = controls.lookLeftRight;

    let lookDirV = createVector(lookX, lookY);

    if (lookLeftRight != 0) {
        lookDirV = lookDirV.rotate(lookLeftRight);
        lookX = lookDirV.x;
        lookY = lookDirV.y;
    }

    if (lookUpDown != 0) {
        lookZ += lookUpDown;
        if (lookZ > 0.9)
            lookZ = 0.9;
        else if (lookZ < -0.9)
            lookZ = -0.9;
    }

    let lookScale = cos(abs(lookZ * HALF_PI));
    lookXScaled = lookX * lookScale;
    lookYScaled = lookY * lookScale;

    camera(posX, posY, posZ - playerHeight, posX + lookXScaled, posY + lookYScaled, posZ - playerHeight + sin(lookZ * HALF_PI), 0, 0, 1);

    // Send new position.
    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
    if (sumOfAll != oldSumOfAll) sendNewPosition();
}

function draw() {
    update();

    background(200, 200, 200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    drawAllObjectsInList(PLATFORM_LIST);

    if (SOCKET_LIST.length > 0) drawPlayers();

    //drawTest.draw();

    drawTestObjects();
}

function keyPressed() {
    return false; // prevent any default behaviour.
}

function keyReleased() {
    return false; // prevent any default behavior.
}

function keyTyped() {
    return false; // prevent any default behaviour.
}

function touchStarted() {
    // console.log(touches);
    // socket.emit('log', touches);

    if (!fullscreen()) {
        // socket.emit('log', "Before fullscreen width: " + windowWidth + ", height: " + windowHeight);
        fullscreen(true);
        requestPointerLock();
    }

    controls.handleTouchStarted();
    return false; // prevent any default behaviour.
}

function touchMoved() {
    // console.log(touches);
    // socket.emit('log', touches);
    return false; // prevent any default behaviour.
}

function touchEnded() {
    // console.log(touches);
    // socket.emit('log', touches);
    controls.handleTouchEnded();
    return false; // prevent any default behaviour.
}