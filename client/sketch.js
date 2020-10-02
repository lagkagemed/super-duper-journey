// Spil på: http://super-duper-journey.herokuapp.com/

let posX = -500;
let posY = 0;
let posZ = -200;
let lookX = 1;
let lookY = 0;
let lookZ = 0;

// gravity + jump
let physGravity = 2;
let physZVel = 0;
let physZVelMax = 20;
let physJump = -30;
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
            rotateY(-playerDir.heading());
            model(humanModel);
            pop();
        }
    }
}

var Platform = function (x, y, z, d, w, h, color) {
    var self = {
        x: x,
        y: y,
        z: z,
        depth: d,
        width: w,
        height: h,
        color: color,
    }
    self.draw = function () {
        push();
        stroke(0, 0, 0);
        fill(color);
        translate(x, y, z);
        box(d, w, h);
        pop();
    }
    return self;
}

var ground = Platform(0, 0, 13, 5000, 2000, 5, "GREY");

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

    // Movement
    let walkForward = keyIsDown(87); // W
    let walkBack = keyIsDown(83); // S
    let walkLeft = keyIsDown(65); // A
    let walkRight = keyIsDown(68); // D
    let walkRun = keyIsDown(16); // Shift
    let jump = keyIsDown(32); // Shift
    let spdWalk = 6;
    let spdRun = 15;

    let walk = false;
    let walkDirV = createVector(lookX, lookY);
    if (walkForward && !walkBack && !walkLeft && !walkRight) {
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && !walkRight) {
        walkDirV = walkDirV.rotate(PI);
        walk = true;
    } else if (!walkForward && !walkBack && walkLeft && !walkRight) {
        walkDirV = walkDirV.rotate(HALF_PI);
        walk = true;
    } else if (!walkForward && !walkBack && !walkLeft && walkRight) {
        walkDirV = walkDirV.rotate(-HALF_PI);
        walk = true;
    } else if (walkForward && !walkBack && walkLeft && !walkRight) {
        walkDirV = walkDirV.rotate(QUARTER_PI);
        walk = true;
    } else if (walkForward && !walkBack && !walkLeft && walkRight) {
        walkDirV = walkDirV.rotate(-QUARTER_PI);
        walk = true;
    } else if (!walkForward && walkBack && walkLeft && !walkRight) {
        walkDirV = walkDirV.rotate(QUARTER_PI + HALF_PI);
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && walkRight) {
        walkDirV = walkDirV.rotate(-QUARTER_PI - HALF_PI);
        walk = true;
    }
    if (walk) {
        if (!walkRun) {
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

    // Look Direction
    let lookUp = keyIsDown(UP_ARROW);
    let lookDown = keyIsDown(DOWN_ARROW);
    let lookLeft = keyIsDown(LEFT_ARROW);
    let lookRight = keyIsDown(RIGHT_ARROW);

    let lookDirV = createVector(lookX, lookY);
    if (lookLeft) {
        lookDirV = lookDirV.rotate(0.02);
        lookX = lookDirV.x;
        lookY = lookDirV.y;
    }
    if (lookRight) {
        lookDirV = lookDirV.rotate(-0.02);
        lookX = lookDirV.x;
        lookY = lookDirV.y;
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
    lookDirV = lookDirV.mult(cos(abs(lookZ)));
    // print("lookDirV.x: " + lookDirV.x + ", lookDirV.y: " + lookDirV.y + ", lookZ: " + lookZ);

    // Draw Camera
    camera(posX, posY, posZ, posX + lookDirV.x, posY + lookDirV.y, posZ + sin(lookZ), 0, 0, 1);

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

    ground.draw();

    // Human
    push();
    noStroke();
    fill("RED");
    translate(0, -400, 0);
    let playerDir = createVector(lookX, lookY);
    scale(30);
    rotateX(-HALF_PI);
    rotateY(-playerDir.heading());
    model(humanModel);
    pop();


    updateZVel();

    sumOfAll = (posX + posY + posZ + lookX + lookY + lookZ);

    if (sumOfAll != oldSumOfAll) sendNewPosition();

    if (SOCKET_LIST.length > 0) drawPlayers();

}