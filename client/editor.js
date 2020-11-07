class Editor {
    constructor() {
        const editor = document.getElementById("editor");
        const editorHeader = document.getElementById("editor-header");
        const editorText = document.getElementById("editor-text");
        editorHeader.style.fontSize = min(windowWidth, windowHeight) / 30 + "px";
        editorText.style.fontSize = min(windowWidth, windowHeight) / 40 + "px";
        this.editor = editor;
        this.editorHeader = editorHeader;
        this.editorText = editorText;

        this.isStarted = false;

        this.isAddingPlatform = false;
        this.platformCornerNumber = 0;
        this.platformCorner0X = 0;
        this.platformCorner0Y = 0;
        this.platformCorner0Z = 0;
    }

    start() {
        this.isStarted = true;
        this.menuMain();
        this.editor.style.visibility = "visible";
    }

    stop() {
        this.isStarted = false;
        noClip = false;
        this.editor.style.visibility = "hidden";
    }

    menuMain() {
        this.editorHeader.innerHTML =
            "Welcome to the Super Duper Editor";

        this.editorText.innerHTML =
            "Here is all the information you need to create your dream world." + "<br>" +
            "<br>" +
            "Press:" + "<br>" +
            "<br>" +
            "1 = Normal mode." + "<br>" +
            "2 = No clip mode." + "<br>" +
            "<br>" +
            "3 = Add platform." + "<br>" +
            "[?] = Remove platform. (not ready)" + "<br>" +
            "<br>" +
            "[?] = Load world. (not ready)" + "<br>" +
            "[?] = Save world. (not ready)";
    }

    handleKeyPressed(key) {
        if (!this.isStarted) {
            if (key === 80) { // P
                this.start();
            }
        } else {
            switch (key) {
                case 80: // P
                    this.stop();
                    break;

                case 48: // 0
                case 96: // 0

                    break;

                case 49: // 1
                case 97: // 1
                    noClip = false;
                    break;

                case 50: // 2
                case 98: // 2
                    noClip = true;
                    break;

                case 51: // 3
                case 99: // 3
                    this.isAddingPlatform = true;
                    break;
                case 52: // 4
                case 100: // 4

                    break;
                case 53: // 5
                case 101: // 5

                    break;
                case 54: // 6
                case 102: // 6

                    break;
                case 55: // 7
                case 103: // 7

                    break;
                case 56: // 8
                case 104: // 8

                    break;
                case 57: // 9
                case 105: // 9

                    break;
                default:
            }
        }
    }

    calcPlatform() {
        let x = this.platformCorner0X + ((pointerGridX - this.platformCorner0X) / 2);
        let y = this.platformCorner0Y + ((pointerGridY - this.platformCorner0Y) / 2);
        let z = this.platformCorner0Z + ((pointerGridZ - this.platformCorner0Z) / 2);
        let sizeX = abs(pointerGridX - this.platformCorner0X);
        let sizeY = abs(pointerGridY - this.platformCorner0Y);
        let sizeZ = abs(pointerGridZ - this.platformCorner0Z);
        if (sizeX === 0) {
            sizeX = pointerGridSize;
            x += pointerGridSize / 2;
        }
        if (sizeY === 0) {
            sizeY = pointerGridSize;
            y += pointerGridSize / 2;
        }
        if (sizeZ === 0) {
            sizeZ = pointerGridSize;
            z += pointerGridSize / 2;
        }
        return {
            x: x,
            y: y,
            z: z,
            sizeX: sizeX,
            sizeY: sizeY,
            sizeZ: sizeZ
        };
    }

    handleMouseClicked() {
        if (this.isAddingPlatform) {
            if (this.platformCornerNumber === 0) {
                this.platformCorner0X = pointerGridX;
                this.platformCorner0Y = pointerGridY;
                this.platformCorner0Z = pointerGridZ;
                this.platformCornerNumber = 1;
            } else if (this.platformCornerNumber === 1) {
                this.isAddingPlatform = false;
                this.platformCornerNumber = 0;
                let calcP = this.calcPlatform();
                Platform(calcP.x, calcP.y, calcP.z, calcP.sizeX, calcP.sizeY, calcP.sizeZ, "DarkGreen", grassTexture);
            }
        }
    }

    draw() {
        // Draw pointer
        if (this.isAddingPlatform) {
            push();
            stroke(0);
            strokeWeight(2);
            translate(pointerGridX, pointerGridY, pointerGridZ);
            stroke(0);
            strokeWeight(2);
            line(8, 0, 0, -8, 0, 0);
            line(0, 8, 0, 0, -8, 0);
            line(0, 0, 8, 0, 0, -8);
            noStroke();
            pop();

            if (this.platformCornerNumber === 1) {
                let calcP = this.calcPlatform();
                push();
                translate(calcP.x, calcP.y, calcP.z);
                fill("DarkGreen");
                box(calcP.sizeX, calcP.sizeY, calcP.sizeZ);
                pop();
            }
        }
    }
}