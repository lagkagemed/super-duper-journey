// Spil på: http://super-duper-journey.herokuapp.com/

let controls;

let humanModel;
let sm64treeTexture;
let polyTexture;
let grassTexture;
let buttonATexture;
let buttonBTexture;

let ground;

let posX = -500;
let posY = 0;
let posZ = -200;
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

function updateZVel() {
    physZVel += physGravity;
    if (physZVel > physZVelMax) physZVel = physZVelMax;
    posZ += physZVel;
    if (posZ > -200) {
        posZ = -200;
        standing = true;
    }
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
            translate(SOCKET_LIST[i].x, SOCKET_LIST[i].y, (SOCKET_LIST[i].z + 200));
            let playerDir = createVector(SOCKET_LIST[i].lX, SOCKET_LIST[i].lY);
            scale(23);
            rotateX(-HALF_PI);
            rotateY(-playerDir.heading());
            model(humanModel);
            pop();
        }
    }
}

function preload() {
    humanModel = loadModel('./client/assets/HumanModel.obj');
    sm64treeTexture = loadImage('./client/assets/sm64tree.png');
    polyTexture = loadImage('./client/assets/Poly.png');
    grassTexture = loadImage('./client/assets/Grass.png');
    buttonATexture = loadImage('./client/assets/ButtonA.png');
    buttonBTexture = loadImage('./client/assets/ButtonB.png');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('sketch-holder');
    
    controls = new Controls();

    ground = Platform(0, 0, 13, 5000, 2000, 5, "GREEN", grassTexture);

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

    updateZVel();

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

    noStroke();

    background(200, 200, 200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    camera(posX, posY, posZ, posX + lookXScaled, posY + lookYScaled, posZ + sin(lookZ * HALF_PI), 0, 0, 1);

    ground.draw();

    if (SOCKET_LIST.length > 0) drawPlayers();

    drawTestGrass();
    drawTestObjects();

    // controls.draw(posX, posY, posZ, lookXScaled, lookYScaled, lookZ);
}

function drawTestGrass() {
    push();

    texture(grassTexture);

    textureWrap(REPEAT);

    translate(0, -2200, 0);

    rotateY(PI);

    let u = 128 * 20;
    let v = 128 * 20;

    beginShape();
    vertex(1000, 1000, 0, 0, 0);
    vertex(1000, -1000, 0, u, 0);
    vertex(-1000, -1000, 0, u, v);
    vertex(-1000, 1000, 0, 0, v);
    endShape(CLOSE);

    pop();
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

function touchStarted() {
    // console.log(touches);
    // socket.emit('log', touches);

    if (!fullscreen()) {
        // socket.emit('log', "Before fullscreen width: " + windowWidth + ", height: " + windowHeight);
        fullscreen(true);
    }

    controls.handleTouchStarted();
    return false;
}

function touchMoved() {
    // console.log(touches);
    // socket.emit('log', touches);
    return false;
}

function touchEnded() {
    // console.log(touches);
    // socket.emit('log', touches);
    controls.handleTouchEnded();
    return false;
}