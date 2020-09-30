let posX = -500;
let posY = 0;
let posZ = -200;
let lookX = 1;
let lookY = 0;
let lookZ = 0;

let oldSumOfAll = 0;
let sumOfAll = 0;

let humanModel;

let myId = 0;
let SOCKET_LIST = [];
let socket = io();
socket.emit('helloWorld');

socket.on('idGranted', function (data) {
    myId = data;
    console.log(myId);
});

function sendNewPosition() {
    var pack = [];
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
    for (var i = 0; i < SOCKET_LIST.length; i++) {
        if (SOCKET_LIST[i].id != myId) {
            push();
            noStroke();
            fill("RED");
            translate(SOCKET_LIST[i].x, SOCKET_LIST[i].y, (SOCKET_LIST[i].z + 200));
            let playerDir = createVector(SOCKET_LIST[i].lX, SOCKET_LIST[i].lY);
            scale(30);
            rotateX(-HALF_PI);
            rotateY(playerDir.heading());
            model(humanModel);
            pop();
        }
    }
}

function preload() {
    humanModel = loadModel('./client/assets/HumanModel.obj');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // frameRate(60);
}

function draw() {
    background(200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    // print(frameRate());

    // push();
    // textSize(32);
    // stroke(0, 0, 0);
    // fill(0, 0, 0);
    // text('Move: W A S D', 10, 30);
    // text('Look: Up Down Left Right', 10, 50);
    // pop();

    // Movement
    let walkForward = keyIsDown(87); // W
    let walkBack = keyIsDown(83); // S
    let walkLeft = keyIsDown(65); // A
    let walkRight = keyIsDown(68); // D
    let walkRun = keyIsDown(16); // Shift)
    let spdWalk = 4;
    let spdRun = 10;

    let walk = false;
    let dirV = createVector(lookX, lookY);
    if (walkForward && !walkBack && !walkLeft && !walkRight) {
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && !walkRight) {
        dirV = dirV.rotate(PI);
        walk = true;
    } else if (!walkForward && !walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(HALF_PI);
        walk = true;
    } else if (!walkForward && !walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-HALF_PI);
        walk = true;
    } else if (walkForward && !walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(QUARTER_PI);
        walk = true;
    } else if (walkForward && !walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-QUARTER_PI);
        walk = true;
    } else if (!walkForward && walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(QUARTER_PI + HALF_PI);
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-QUARTER_PI - HALF_PI);
        walk = true;
    }
    if (walk && !walkRun) {
        posX += dirV.x * spdWalk;
        posY += dirV.y * spdWalk;
    }
    if (walk && walkRun) {
        posX += dirV.x * spdRun;
        posY += dirV.y * spdRun;
    }

    // Look Direction
    let lookUp = keyIsDown(UP_ARROW);
    let lookDown = keyIsDown(DOWN_ARROW);
    let lookLeft = keyIsDown(LEFT_ARROW);
    let lookRight = keyIsDown(RIGHT_ARROW);

    dirV = createVector(lookX, lookY);
    if (lookLeft) {
        dirV = dirV.rotate(0.02);
        lookX = dirV.x;
        lookY = dirV.y;
    }
    if (lookRight) {
        dirV = dirV.rotate(-0.02);
        lookX = dirV.x;
        lookY = dirV.y;
    }
    // print("x: " + lookX + ", y: " + lookY);

    if (lookUp) {
        lookZ -= 0.02;
        if (lookZ < -HALF_PI + 0.1)
            lookZ = -HALF_PI + 0.1;
    }
    if (lookDown) {
        lookZ += 0.02;
        if (lookZ > HALF_PI - 0.1)
            lookZ = HALF_PI - 0.1;
    }
    dirV = createVector(lookX, lookY);
    dirV = dirV.mult(cos(abs(lookZ)));
    // print("dirV.x: " + dirV.x + ", dirV.y: " + dirV.y + ", lookZ: " + lookZ);

    // Draw Camera
    camera(posX, posY, posZ, posX + dirV.x, posY + dirV.y, posZ + sin(lookZ), 0, 0, 1);

    // push();
    // stroke(0, 0, 0);
    // fill(255, 0, 0);
    // translate((posX + dirV.x) * 1000, (posY + dirV.y) * 1000, (posZ + sin(lookZ)) * 1000);
    // sphere(10);
    // pop();

    // Green Box
    push();
    stroke(0, 0, 0);
    fill(0, 255, 0);
    translate(0, -100);
    box(500, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(0, 255, 0);
    translate(0, -100, -400);
    box(500, 100, 20);
    pop();

    // Yellow Box
    push();
    stroke(0, 0, 0);
    fill(255, 255, 0);
    translate(0, 0);
    box(500, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(255, 255, 0);
    translate(0, 0, -400);
    box(500, 100, 20);
    pop();

    // Blue Box
    push();
    stroke(0, 0, 0);
    fill(0, 0, 255);
    translate(0, 100);
    box(500, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(0, 0, 255);
    translate(0, 100, -400);
    box(500, 100, 20);
    pop();

    // Purple Box
    push();
    stroke(0, 0, 0);
    fill("#FF00E5");
    translate(0, 160, -200);
    box(500, 20, 420);
    pop();

    push();
    stroke(0, 0, 0);
    fill("#FF00E5");
    translate(0, -160, -200);
    box(500, 20, 420);
    pop();

    // Human
    push();
    noStroke();
    fill("#FF00E5");
    translate(0, -400, 0);
    scale(30);
    rotateX(-HALF_PI);
    rotateY(frameCount * 0.01);
    model(humanModel);
    pop();

    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);

    if (sumOfAll != oldSumOfAll) sendNewPosition();

    if (SOCKET_LIST.length > 0) drawPlayers();
}