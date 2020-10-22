// Spil på: http://super-duper-journey.herokuapp.com/

let controls;

let humanModel;
let sm64treeTexture;
let polyTexture;
let grassTexture;
let testTexture;
let buttonATexture;
let buttonBTexture;

let ground;

let drawTest;

let posX = -500;
let posY = 0;
let posZ = 0;
let lookX = 1;
let lookY = 0;
let lookZ = 0;
let lookXScaled = 0;
let lookYScaled = 0;

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const spdWalk = 6;
const spdRun = 15;

// gravity + jump
const physGravity = 2;
let physZVel = 0;
const physZVelMax = 20;
const physJump = -30;
let standing = true;

// Duck
const playerHeightStand = 200;
const playerHeightDuck = 100;
let playerHeight = playerHeightStand;
let playerIsDucking = false;

function updateZVel() {
    physZVel += physGravity;
    if (physZVel > physZVelMax) physZVel = physZVelMax;
    posZ += physZVel;
}

let oldSumOfAll = 0;
let sumOfAll = 0;

let myId = 0;
let SOCKET_LIST = [];
let socket = io();
// socket.emit('helloWorld');

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

function testColPlayer(object){
    if (posZ > (object.z - (object.height)) && (posZ - 50) < (object.z + (object.height)) && (posX + 50) > (object.x - (object.width / 2)) && (posX - 50) < (object.x + (object.width / 2)) && (posY + 50) > (object.y - (object.depth / 2)) && (posY - 50) < (object.y + (object.depth / 2))){
        posZ = (object.z - (object.height));
        standing = true;
    }
}

function testColPlayerList(list){
    for(let i in list){
        let object = list[i];
        testColPlayer(object);
    }
}

function drawAllObjectsInList(list){
    for(let i in list){
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
    buttonATexture = loadImage('./client/assets/ButtonA.png');
    buttonBTexture = loadImage('./client/assets/ButtonB.png');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('sketch-holder');

    controls = new Controls();

    ground = Platform(0, 0, 13, 5000, 2000, 5, "GREEN", grassTexture);

    plat1 = Platform(0, 1300, 13, 200, 200, 5, "GREEN", grassTexture);

    plat2 = Platform(0, 1700, 13, 200, 200, 5, "GREEN", grassTexture);

    plat3 = Platform(0, 2100, 13, 200, 200, 5, "GREEN", grassTexture);

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

    // Send new position.
    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);
    if (sumOfAll != oldSumOfAll) sendNewPosition();
}

function draw() {
    update();

    background(200, 200, 200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    camera(posX, posY, posZ - playerHeight, posX + lookXScaled, posY + lookYScaled, posZ - playerHeight + sin(lookZ * HALF_PI), 0, 0, 1);

    drawAllObjectsInList(PLATFORM_LIST);
    //ground.draw();

    if (SOCKET_LIST.length > 0) drawPlayers();

    drawTest.draw();

    drawTestObjects();
}

function drawTestObjects() {
    // Green Box
    push();
    fill(0, 255, 0);
    translate(0, -100, 0);
    box(500, 100, 20);
    pop();

    push();
    fill(0, 255, 0);
    translate(0, -100, -400);
    box(500, 100, 20);
    pop();

    // Yellow Box
    push();
    fill(255, 255, 0);
    translate(0, 0, 0);
    box(500, 100, 20);
    pop();

    push();
    fill(255, 255, 0);
    translate(0, 0, -400);
    box(500, 100, 20);
    pop();

    // Blue Box
    push();
    fill(0, 0, 255);
    translate(0, 100, 0);
    box(500, 100, 20);
    pop();

    push();
    fill(0, 0, 255);
    translate(0, 100, -400);
    box(500, 100, 20);
    pop();

    // Purple Box
    push();
    fill("#FF00E5");
    translate(0, 160, -200);
    box(500, 20, 420);
    pop();

    push();
    fill("#FF00E5");
    translate(0, -160, -200);
    box(500, 20, 420);
    pop();

    // Human
    push();
    fill("RED");
    translate(0, -400, 0);
    scale(23);
    rotateX(-HALF_PI);
    rotateY(-PI);
    model(humanModel);
    pop();

    push();
    texture(sm64treeTexture);
    translate(0, 600, -320);
    let playerDir = createVector(lookX, lookY);
    rotateX(HALF_PI);
    rotateY(HALF_PI + PI + playerDir.heading());
    plane(350, 700);
    pop();

    push();
    texture(polyTexture);
    translate(500, 800, -250);
    playerDir = createVector(lookX, lookY);
    rotateX(HALF_PI);
    rotateY(HALF_PI + PI + playerDir.heading());
    plane(1000, 1000);
    pop();
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