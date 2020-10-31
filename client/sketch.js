socket.on('idGranted', function (data) {
    myId = data;
    // console.log(myId);
});

socket.on('useEditor', function () {
    editor = new Editor();
    editor.menuMain();
});

function sendNewPosition() {
    let pack = [];
    pack.push({
        x: posX,
        y: posY,
        z: posZ,
        lX: lookX,
        lY: lookY,
        color: myColor,
        model: myModel
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
            fill(SOCKET_LIST[i].color);
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

function drawAllObjectsInList(list) {
    for (let i in list) {
        let object = list[i];
        object.draw();
    }
}

function preload() {
    humanModel = loadModel('./client/assets/HumanModel.obj');
    penguinModel = loadModel('./client/assets/PenguinModel.obj');
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
    initColorChooser();

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

    // Look Direction
    let lookUpDown = controls.lookUpDown;
    let lookLeftRight = controls.lookLeftRight;

    let lookDirV = createVector(lookX, lookY);

    if (lookLeftRight != 0) {
        lookDirV = lookDirV.rotate(lookLeftRight);
        lookX = lookDirV.x;
        lookY = lookDirV.y;
    }

    if (lookUpDown != 0 && jumpSalto === 0) {
        lookZ += lookUpDown;
        if (lookZ > 0.9)
            lookZ = 0.9;
        else if (lookZ < -0.9)
            lookZ = -0.9;
    }

    // front salto
    if (jumpSalto > 0 && lookZ <= 4) {
        lookZ += jumpSalto;
        jumpSalto += 0.002;
    }

    if (lookZ > 4) {
        jumpSalto = 0;
        lookZ = 0;
    }

    let up = 1;
    if (lookZ > 1 && lookZ <= 3) up = -1;

    let lookScale = cos(abs(lookZ * HALF_PI));
    let lookXScaled = lookX * lookScale;
    let lookYScaled = lookY * lookScale;

    camera.camera(posX, posY, posZ - playerHeight, posX + lookXScaled, posY + lookYScaled, posZ - playerHeight + sin(lookZ * HALF_PI), 0, 0, up);

    // Send new position.
    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
    if (sumOfAll != oldSumOfAll) sendNewPosition();

    updateTestSprites();

    if (posX < -2500) closeToColor = true;
    if (posX > -2500) closeToColor = false;
    if (closeToColor) testColPlayerColList();
}

function draw() {
    update();

    background(200, 200, 200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    drawAllObjectsInList(PLATFORM_LIST);

    if (SOCKET_LIST.length > 0) drawPlayers();

    drawTest.draw();

    drawTestObjects();

    drawTestSprites();
}

function keyPressed() {
    if (editor != null && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
        editor.handleKeyPresed(keyCode);
    }
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