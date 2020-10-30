// Spil på: http://super-duper-journey.herokuapp.com/

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

function respawn() {
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
    rabbitSprite = loadImage('./client/assets/Rabbit.png');
}

function setGameSize() {
    gameWidth = windowWidth / gameScale;
    gameHeight = windowHeight / gameScale;
}

function canvasFillScreen() {
    let canvasElement = document.getElementById(canvas.elt.id);
    canvasElement.style.width = windowWidth + "px";
    canvasElement.style.height = windowHeight + "px";
}

function setup() {
    setGameSize();
    canvas = createCanvas(gameWidth, gameHeight, WEBGL);
    canvas.parent('sketch-holder');
    canvasFillScreen();

    controls = new Controls();

    camera = createCamera();
    // camera.defaultCameraNear *= gameScale;
    // camera.defaultCameraFar *= gameScale;
    camera.defaultCameraNear = 10;
    camera.defaultCameraFar = 10000;
    camera.perspective(camera.defaultCameraFOV, camera.defaultAspectRatio, camera.defaultCameraNear, camera.defaultCameraFar);
    setCamera(camera);

    initTestBoxes();

    initTestSprites();

    drawTest = new DrawTest();

    textureWrap(REPEAT); // REPEAT, CLAMP
    noStroke();
    // noFill();

    // frameRate(60);
}

function windowResized() {
    // socket.emit('log', "After resize: width: " + gameWidth + ", height: " + gameHeight);
    setGameSize();
    resizeCanvas(gameWidth, gameHeight);
    canvasFillScreen();

    controls = new Controls();
}

function update() {
    // print(frameRate());

    setOldPos();

    controls.update();

    basicMovement();

    updateZVel();
    standing = false;
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

    if (lookUpDown != 0 && jumpSalto == 0) {
        lookZ += lookUpDown;
        if (lookZ > 0.9)
            lookZ = 0.9;
        else if (lookZ < -0.9)
            lookZ = -0.9;
    }

    // front salto
    if(jumpSalto > 0 && lookZ <= 4) {
        lookZ += jumpSalto;
        jumpSalto += 0.002;
    }

    if (lookZ > 4) {
        jumpSalto = 0;
        lookZ = 0;
    }

    let lookScale = cos(abs(lookZ * HALF_PI));
    lookXScaled = lookX * lookScale;
    lookYScaled = lookY * lookScale;

    camera.camera(posX, posY, posZ - playerHeight, posX + lookXScaled, posY + lookYScaled, posZ - playerHeight + sin(lookZ * HALF_PI), 0, 0, 1);

    // Send new position.
    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
    if (sumOfAll != oldSumOfAll) sendNewPosition();

    updateTestSprites();
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

    drawTestSprites();
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
        // socket.emit('log', "Before fullscreen width: " + gameWidth + ", height: " + gameHeight);
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