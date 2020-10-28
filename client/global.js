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
let posZ = -50;
let lookX = 1;
let lookY = 0;
let lookZ = 0;
let lookXScaled = 0;
let lookYScaled = 0;
let oldPosX = -700;
let oldPosY = -200;
let oldPosZ = -100;

// Walk
const spdWalk = 6;
const spdRun = 15;

// gravity + jump
const physGravity = 1.5;
let physZVel = 0;
const physZVelMax = 40;
let physJump = -30;
let standing = true;
let jumpComboCounter = 0;
let jumpComboTimer = 0;

// Duck
const playerHeightStand = 200;
const playerHeightDuck = 100;
let playerHeight = playerHeightStand;
let playerIsDucking = false;
let unduck = 3;

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
let rabbitSprite;

let drawTest;

let spriteArray = [];

// Netowrking
let oldSumOfAll = 0;
let sumOfAll = 0;

let myId = 0;
let SOCKET_LIST = [];
let socket = io();
// socket.emit('helloWorld');