let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let gameScale = 2; // 1 = Original. Bigger number = lower resolution.
let gameWidth = 0;
let gameHeight = 0;

let canvas;

let controls;

let camera;

// Position + camera
let posX = -500;
let posY = 0;
let posZ = 0;
let lookX = 1;
let lookY = 0;
let lookZ = 0;
let lookXScaled = 0;
let lookYScaled = 0;

// Walk
const spdWalk = 6;
const spdRun = 15;

// gravity + jump
const physGravity = 1.5;
let physZVel = 0;
const physZVelMax = 20;
const physJump = -30;
let standing = true;

// Duck
const playerHeightStand = 200;
const playerHeightDuck = 100;
let playerHeight = playerHeightStand;
let playerIsDucking = false;

// 3D Models
let humanModel;

// Texture
let sm64treeTexture;
let polyTexture;
let grassTexture;
let testTexture;
let testTexture2;
let buttonATexture;
let buttonBTexture;

let drawTest;

// Netowrking
let oldSumOfAll = 0;
let sumOfAll = 0;

let myId = 0;
let SOCKET_LIST = [];
let socket = io();
// socket.emit('helloWorld');