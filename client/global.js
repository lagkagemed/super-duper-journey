let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let editor = null;

let gameScale = 2; // 1 = Original. Bigger number = lower resolution.
let gameWidth = 0;
let gameHeight = 0;

let canvas;

let controls = null;

let camera;

// Position + camera
let posX = -500;
let posY = 0;
let posZ = -50;
let lookX = 1;
let lookY = 0;
let lookZ = 0;
let pointerDist = 200;
const pointerDistMin = 50;
const pointerDistMax = 400;
let pointerX = 0;
let pointerY = 0;
let pointerZ = 0;
let pointerGridX = 0;
let pointerGridY = 0;
let pointerGridZ = 0;
let pointerGridSize = 128;
let oldPosX = -700;
let oldPosY = -200;
let oldPosZ = -100;

// Walk
let physXYVel = 0;
const physMaxSpdWalk = 6;
const physMaxSpdRun = 25;

// No clip mode
let noClip = false;

// gravity + jump
const physGravity = 1.5;
let physZVel = 0;
const physZVelMax = 40;
let physJump = -30;
let standing = true;
let jumpComboCounter = 0;
let jumpComboTimer = 0;
let jumpSalto = 0;

// Duck
const playerHeightStand = 200;
const playerHeightDuck = 100;
let playerHeight = playerHeightStand;
let playerIsDucking = false;
let unduck = 3;

// 3D Models
let humanModel;
let penguinModel;
let duckModel;

// Texture
let textureScale = 2; // Bigger number = more detailed (smaller) texture.
let sm64treeTexture;
let polyTexture;
let grassTexture;
let testTexture;
let testTexture2;
let testTexture3;
let buttonATexture;
let buttonBTexture;
let rabbitSprite;

let drawTest;

let spriteArray = [];

// Netowrking
let oldSumOfAll = 0;
let sumOfAll = 0;

let myId = 0;
let myColor = "RED";
let myModel = 0;
let goToWorld = '';
let SOCKET_LIST = [];
let socket = io();
// socket.emit('helloWorld');