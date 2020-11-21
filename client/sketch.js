socket.on('idGranted', function (data) {
    myId = data;
});

socket.on('mapData', function (data) {
    SOCKET_LIST = [];
    PLATFORM_LIST = [];
    TESTMODEL_LIST = [];
    spriteArray = [];
    for (let i in data) {
        if (data[i].type == 1) {
            let platform = Platform(data[i].x, data[i].y, data[i].z, data[i].width, data[i].depth, data[i].height, data[i].color, data[i].func);
        }
        if (data[i].type == 2) {
            let testModel = TestModel(data[i].x, data[i].y, data[i].z, data[i].scale, data[i].rotateX, data[i].rotateY, data[i].rotateZ, data[i].model, data[i].fill);
        }
        if (data[i].type == 3) {
            if (data[i].tex == 0) {
                spriteArray.push(new Sprite(data[i].x, data[i].y, data[i].z, sm64treeTexture));
            }
            if (data[i].tex == 1) {
                spriteArray.push(new Sprite(data[i].x, data[i].y, data[i].z, polyTexture));
            }
            if (data[i].tex == 2) {
                spriteArray.push(new Sprite(data[i].x, data[i].y, data[i].z, rabbitSprite));
            }
        }
    }
});

function addPlatform(x, y, z, sizeX, sizeY, sizeZ, color, func) {
    //platform = Platform(x, y, z, sizeX, sizeY, sizeZ, color, func)
    platform = {};
    platform.x = x;
    platform.y = y;
    platform.z = z;
    platform.width = sizeX;
    platform.depth = sizeY;
    platform.height = sizeZ;
    platform.color = color;
    platform.func = func;
    platform.type = 1;
    socket.emit('addPlatform', platform);
}

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
        if (SOCKET_LIST[i].id != myId && SOCKET_LIST[i].model == 0) {
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
        if (SOCKET_LIST[i].id != myId && SOCKET_LIST[i].model == 1) {
            push();
            fill(SOCKET_LIST[i].color);
            translate(SOCKET_LIST[i].x, SOCKET_LIST[i].y, (SOCKET_LIST[i].z));
            let playerDir = createVector(SOCKET_LIST[i].lX, SOCKET_LIST[i].lY);
            scale(230);
            rotateX(-HALF_PI);
            rotateY(-playerDir.heading() + HALF_PI);
            model(penguinModel);
            pop();
        }
        if (SOCKET_LIST[i].id != myId && SOCKET_LIST[i].model == 2) {
            push();
            fill(SOCKET_LIST[i].color);
            translate(SOCKET_LIST[i].x, SOCKET_LIST[i].y, (SOCKET_LIST[i].z));
            let playerDir = createVector(SOCKET_LIST[i].lX, SOCKET_LIST[i].lY);
            scale(4);
            rotateY(PI);
            rotateZ(-playerDir.heading() - HALF_PI)
            model(duckModel);
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
    duckModel = loadModel('./client/assets/DuckModel.obj');
    sm64treeTexture = loadImage('./client/assets/sm64tree.png');
    polyTexture = loadImage('./client/assets/Poly.png');
    grassTexture = loadImage('./client/assets/Grass.png');
    testTexture = loadImage('./client/assets/TestTexture.png');
    testTexture2 = loadImage('./client/assets/TestTexture2.png');
    testTexture3 = loadImage('./client/assets/TestTexture3.png');
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

    editor = new Editor();

    camera = createCamera();
    // camera.defaultCameraNear *= gameScale;
    // camera.defaultCameraFar *= gameScale;
    camera.defaultCameraNear = 10;
    camera.defaultCameraFar = 10000;
    camera.perspective(camera.defaultCameraFOV, camera.defaultAspectRatio, camera.defaultCameraNear, camera.defaultCameraFar);
    setCamera(camera);

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

    let posZEyes = posZ - playerHeight;
    let lookZScaled = sin(lookZ * HALF_PI);

    camera.camera(posX, posY, posZEyes, posX + lookXScaled, posY + lookYScaled, posZEyes + lookZScaled, 0, 0, up);

    pointerX = posX + (lookXScaled * pointerDist);
    pointerY = posY + (lookYScaled * pointerDist);
    pointerZ = posZEyes + (lookZScaled * pointerDist);
    pointerGridX = pointerX - (pointerX % pointerGridSize);
    pointerGridY = pointerY - (pointerY % pointerGridSize);
    pointerGridZ = pointerZ - (pointerZ % pointerGridSize);

    // Send new position.
    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
    if (sumOfAll != oldSumOfAll) sendNewPosition();

    if (goToWorld != '') {
        socket.emit('goToWorld', goToWorld);
        goToWorld = '';
    }

    updateTestSprites();
}

function draw() {
    update();

    background(200, 200, 200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    drawAllObjectsInList(PLATFORM_LIST);
    drawAllObjectsInList(TESTMODEL_LIST);

    if (SOCKET_LIST.length > 0) drawPlayers();

    drawTest.draw();

    //drawTestObjects();

    drawTestSprites();

    editor.draw();
}

function setFullscreen() {
    if (!fullscreen()) {
        // socket.emit('log', "Before fullscreen width: " + gameWidth + ", height: " + gameHeight);
        fullscreen(true);
        requestPointerLock();
    }
}

function keyPressed() {
    if (controls != null)
        controls.handleKeyPressed(keyCode);

    if (editor != null)
        editor.handleKeyPressed(keyCode);

    return false; // prevent any default behaviour.
}

function keyReleased() {
    if (controls != null)
        controls.handleKeyReleased();

    return false; // prevent any default behavior.
}

function keyTyped() {
    return false; // prevent any default behaviour.
}

function mouseClicked() {
    if (editor != null)
        editor.handleMouseClicked();

    setFullscreen();

    return false; // prevent any default behaviour.
}

function mouseMoved(event) {
    if (controls != null)
        controls.handleMouseMoved(event);

    return false; // prevent any default behaviour.
}

function mouseWheel(event) {
    pointerDist -= event.delta * 0.05;
    if (pointerDist < pointerDistMin) pointerDist = pointerDistMin;
    if (pointerDist > pointerDistMax) pointerDist = pointerDistMax;

    return false; // prevent any default behaviour.
}

function touchStarted(event) {
    // console.log(event.touches);
    // socket.emit('log', event.touches);

    if (!fullscreen()) {
        // socket.emit('log', "Before fullscreen width: " + gameWidth + ", height: " + gameHeight);
        fullscreen(true);
        requestPointerLock();
    }

    if (controls != null)
        controls.handleTouchStarted(event);

    return false; // prevent any default behaviour.
}

function touchMoved(event) {
    // console.log(event.touches);
    // socket.emit('log', event.touches);

    if (controls != null)
        controls.handleTouchMoved(event);

    return false; // prevent any default behaviour.
}

function touchEnded(event) {
    // console.log(event.touches);
    // socket.emit('log', event.touches);

    if (controls != null)
        controls.handleTouchEnded(event);

    return false; // prevent any default behaviour.
}

// document.body.addEventListener("touchstart", touchStart, false);
// function touchStart(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     // socket.emit('log', event.touches.length);
//     // socket.emit('log', event.touches[0].identifier);
//     // socket.emit('log', event.touches[0].pageX);
//     // socket.emit('log', event.touches[0].pageY);

//     setFullscreen();

//     if (controls != null)
//         controls.handleTouchStarted(event);

//     return false;
// }

// document.body.addEventListener("touchmove", touchMove, false);
// function touchMove(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (controls != null)
//         controls.handleTouchMoved(event);

//     return false;
// }

// document.body.addEventListener("touchend", touchEnd, false);
// function touchEnd(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (controls != null)
//         controls.handleTouchEnded(event);

//     return false;
// }
