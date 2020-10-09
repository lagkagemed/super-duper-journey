class Controls {
    constructor() {
        // Move
        this.touchMoveId = -1;
        this.touchMoveForward = false;
        this.touchMoveBack = false;
        this.touchMoveLeft = false;
        this.touchMoveRight = false;

        this.touchButtonAId = -1;
        this.touchButtonADown = false;

        this.touchButtonBId = -1;
        this.touchButtonBDown = false;

        const touchButtonSteps = windowHeight / 64;
        this.touchButtonSteps = touchButtonSteps;

        // Look
        this.touchLookId = -1;
        this.touchLookXLast = 0;
        this.touchLookYLast = 0;
        this.touchLookUpDown = 0;
        this.touchLookLeftRight = 0;

        const touchLookSteps = windowHeight / 1.5;
        this.touchLookSteps = touchLookSteps;

        const lookSpeedKeys = 0.02;
        this.lookSpeedKeys = lookSpeedKeys;
    }

    handleTouchStarted() {
        if (touches.length > 0 && (this.touchMoveId === -1 || this.touchButtonAId === -1 || this.touchButtonBId === -1 || this.touchLookId === -1)) {
            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].id;
                if (id === this.touchMoveId)
                    continue;
                if (id === this.touchButtonAId)
                    continue;
                if (id === this.touchButtonBId)
                    continue;
                else if (id === this.touchLookId)
                    continue;

                if (this.touchMoveId === -1) {
                    this.touchMoveId = id;
                    socket.emit('log', "Started touchMoveId: " + id);
                    break;
                } else if (this.touchButtonAId === -1) {
                    this.touchButtonAId = id;
                    socket.emit('log', "Started touchButtonAId: " + id);
                    break;
                } else if (this.touchButtonBId === -1) {
                    this.touchButtonBId = id;
                    socket.emit('log', "Started touchButtonBId: " + id);
                    break;
                } else if (this.touchLookId === -1) {
                    this.touchLookId = id;
                    this.touchLookXLast = touches[i].x;
                    this.touchLookYLast = touches[i].y;
                    socket.emit('log', "Started touchLookId: " + id);
                    break;
                }
            }
        }
    }

    handleTouchMoved() {
        if (touches.length > 0) {
            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].id;
                if (this.touchMoveId === id) {
                    // TODO BB 2020-10-09. Implement.
                } else if (this.touchButtonAId === id) {
                    // TODO BB 2020-10-09. Implement.
                } else if (this.touchButtonBId === id) {
                    // TODO BB 2020-10-09. Implement.
                } else if (this.touchLookId === id) {
                    this.touchLookUpDown = touches[i].y - this.touchLookYLast;
                    this.touchLookYLast = touches[i].y;
                    this.touchLookLeftRight = this.touchLookXLast - touches[i].x;
                    this.touchLookXLast = touches[i].x;
                }
            }
        }
    }

    handleTouchEnded() {
        if (touches.length > 0) {
            if (this.touchMoveId != -1) {
                let found = false;
                for (let i = 0; i < touches.length; i++) {
                    if (touches[i].id === this.touchMoveId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.touchMoveId = -1;
                    socket.emit('log', "Stopped touchMoveId");
                }
            }

            if (this.touchButtonAId != -1) {
                let found = false;
                for (let i = 0; i < touches.length; i++) {
                    if (touches[i].id === this.touchButtonAId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.touchButtonAId = -1;
                    socket.emit('log', "Stopped touchButtonAId");
                }
            }

            if (this.touchButtonBId != -1) {
                let found = false;
                for (let i = 0; i < touches.length; i++) {
                    if (touches[i].id === this.touchButtonBId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.touchButtonBId = -1;
                    socket.emit('log', "Stopped touchButtonBId");
                }
            }

            if (this.touchLookId != -1) {
                let found = false;
                for (let i = 0; i < touches.length; i++) {
                    if (touches[i].id === this.touchLookId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.touchLookId = -1;
                    socket.emit('log', "Stopped touchLookId");
                }
            }
        } else {
            this.touchMoveId = -1;
            this.touchButtonAId = -1;
            this.touchButtonBId = -1;
            this.touchLookId = -1;
            socket.emit('log', "Stopped all ids");
        }
    }

    update() {

    }

    get moveForward() {
        return this.touchMoveForward || keyIsDown(87); // W
    }

    get moveBack() {
        return this.touchMoveBack || keyIsDown(83); // S
    }

    get moveLeft() {
        return this.touchMoveLeft || keyIsDown(65); // A
    }

    get moveRight() {
        return this.touchMoveRight || keyIsDown(68); // D
    }

    get run() {
        return keyIsDown(16); // Shift
    }

    get jump() {
        return keyIsDown(32); // Space
    }

    get lookUpDown() {
        if (this.touchLookUpDown != 0) {
            let look = this.touchLookUpDown / this.touchLookSteps;
            this.touchLookUpDown = 0;
            return look;
        } else {
            if (keyIsDown(UP_ARROW))
                return -this.lookSpeedKeys;
            else if (keyIsDown(DOWN_ARROW))
                return this.lookSpeedKeys;
            else
                return 0;
        }
    }

    get lookLeftRight() {
        if (this.touchLookLeftRight != 0) {
            let look = this.touchLookLeftRight / this.touchLookSteps;
            this.touchLookLeftRight = 0;
            return look;
        } else {
            if (keyIsDown(LEFT_ARROW))
                return this.lookSpeedKeys;
            else if (keyIsDown(RIGHT_ARROW))
                return -this.lookSpeedKeys;
            else
                return 0;
        }
    }

    draw(posX, posY, posZ, dirX, dirY, dirZ) {
        push();

        translate(posX + (dirX * 90), posY + (dirY * 90), posZ + (sin(dirZ * HALF_PI) * 90));
        let vXY = createVector(dirX, dirY);
        rotateZ(vXY.heading());
        rotateY((PI + HALF_PI) - (dirZ * HALF_PI));

        rotateZ(-HALF_PI);

        // Arrows
        texture(arrowsTexture);
        translate(-48, 32, 0);
        plane(32, 32);

        // Button A
        translate(80, 8, 0);
        texture(buttonATexture);
        plane(16, 16);

        // Button B
        translate(24, -16, 0);
        texture(buttonBTexture);
        plane(16, 16);

        pop();
    }
}