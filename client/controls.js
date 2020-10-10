class Controls {
    constructor() {
        // Move
        this.touchMoveId = -1;
        this.touchMoveV = createVector(0, 0);
        this.touchIsMoving = false;

        this.touchButtonAId = -1;
        this.touchButtonADown = false;

        this.touchButtonBId = -1;
        this.touchButtonBDown = false;

        // const touchButtonSteps = 770.5 / 109.5;
        // this.touchButtonSteps = touchButtonSteps;
        // console.log(touchButtonSteps);

        // socket.emit('log', "Window width: " + (windowWidth / 2));
        // socket.emit('log', "Window height: " + (windowHeight / 2));
        // socket.emit('log', "Pixel density: " + (pixelDensity()));
        // socket.emit('log', "Display density: " + (displayDensity()));

        // Look
        this.touchLookId = -1;
        this.touchLookXLast = 0;
        this.touchLookYLast = 0;
        this.touchLookUpDown = 0;
        this.touchLookLeftRight = 0;

        const touchLookSteps = windowHeight;
        this.touchLookSteps = touchLookSteps;

        const lookSpeedKeys = 0.02;
        this.lookSpeedKeys = lookSpeedKeys;
    }

    // printTouch() {
    //     let touchMoveCenterX = (windowWidth / 2);
    //     let touchMoveCenterY = (windowHeight / 2);
    //     let distTouchMoveCenter = floor(dist(touchMoveCenterX, touchMoveCenterY, mouseX, mouseY));
    //     let distX = floor(mouseX - touchMoveCenterX);
    //     let distY = floor(mouseY - touchMoveCenterY);
    //     socket.emit('log', "Dist: " + distTouchMoveCenter + ", X: " + distX + ", Y: " + distY);
    // }

    handleTouchStarted() {
        // this.printTouch();

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

                let x = touches[i].x;
                let y = touches[i].y;

                // Move
                if (this.touchMoveId === -1) {
                    if (x > 0 &&
                        x < (windowWidth / 2) &&
                        y > (windowHeight / 2) &&
                        y < windowHeight) {
                        this.touchMoveId = id;

                        this.touchIsMoving = true;
                        this.touchMoveV.set(x - (windowWidth / 4), y - ((windowHeight / 2) + (windowHeight / 4)));

                        // socket.emit('log', "Started touchMoveId: " + id);
                        break;
                    }
                }

                // A
                if (this.touchButtonAId === -1) {
                    if (x > (windowWidth / 2) &&
                        x < (windowWidth / 2) + (windowWidth / 4) &&
                        y > (windowHeight / 2) &&
                        y < windowHeight) {
                        this.touchButtonAId = id;
                        this.touchButtonADown = true;
                        // socket.emit('log', "Started touchButtonAId: " + id);
                        break;
                    }
                }

                // B
                if (this.touchButtonBId === -1) {
                    if (x > (windowWidth / 2) + (windowWidth / 4) &&
                        x < windowWidth &&
                        y > (windowHeight / 2) &&
                        y < windowHeight) {
                        this.touchButtonBId = id;
                        this.touchButtonBDown = true;
                        // socket.emit('log', "Started touchButtonBId: " + id);
                        break;
                    }
                }

                // Look
                if (this.touchLookId === -1) {
                    if (x > 0 &&
                        x < windowWidth &&
                        y > 0 &&
                        y < (windowHeight / 2)) {
                        this.touchLookId = id;
                        this.touchLookXLast = touches[i].x;
                        this.touchLookYLast = touches[i].y;
                        // socket.emit('log', "Started touchLookId: " + id);
                        break;
                    }
                }
            }
        }
    }

    handleTouchMoved() {
        // this.printTouch();

        if (touches.length > 0) {
            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].id;
                let x = touches[i].x;
                let y = touches[i].y;
                if (this.touchMoveId === id) {
                    // Move
                    this.touchMoveV.set((windowWidth / 4) - x, y - ((windowHeight / 2) + (windowHeight / 4)));
                } else if (this.touchLookId === id) {
                    // Look
                    this.touchLookUpDown = y - this.touchLookYLast;
                    this.touchLookYLast = y;
                    this.touchLookLeftRight = this.touchLookXLast - x;
                    this.touchLookXLast = x;
                }
            }
        }
    }

    handleTouchEnded() {
        // this.printTouch();

        if (touches.length > 0) {
            // Move
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
                    this.touchIsMoving = false;
                    // socket.emit('log', "Stopped touchMoveId");
                }
            }

            // A
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
                    this.touchButtonADown = false;
                    // socket.emit('log', "Stopped touchButtonAId");
                }
            }

            // B
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
                    // socket.emit('log', "Stopped touchButtonBId");
                }
            }

            // Look
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
                    // socket.emit('log', "Stopped touchLookId");
                }
            }
        } else {
            this.touchMoveId = -1;
            this.touchIsMoving = false;
            this.touchButtonAId = -1;
            this.touchButtonADown = false;
            this.touchButtonBId = -1;
            this.touchLookId = -1;
            // socket.emit('log', "Stopped all ids");
        }
    }

    // update() {
    // }

    get move() {
        if (this.touchIsMoving) {
            return { isMoving: true, heading: this.touchMoveV.heading() + HALF_PI };
        } else {
            let walkForward = keyIsDown(87); // W
            let walkBack = keyIsDown(83); // S
            let walkLeft = keyIsDown(65); // A
            let walkRight = keyIsDown(68); // D
            if (walkForward && !walkBack && !walkLeft && !walkRight) {
                return { isMoving: true, heading: 0 };
            } else if (!walkForward && walkBack && !walkLeft && !walkRight) {
                return { isMoving: true, heading: PI };
            } else if (!walkForward && !walkBack && walkLeft && !walkRight) {
                return { isMoving: true, heading: HALF_PI };
            } else if (!walkForward && !walkBack && !walkLeft && walkRight) {
                return { isMoving: true, heading: -HALF_PI };
            } else if (walkForward && !walkBack && walkLeft && !walkRight) {
                return { isMoving: true, heading: QUARTER_PI };
            } else if (walkForward && !walkBack && !walkLeft && walkRight) {
                return { isMoving: true, heading: -QUARTER_PI };
            } else if (!walkForward && walkBack && walkLeft && !walkRight) {
                return { isMoving: true, heading: QUARTER_PI + HALF_PI };
            } else if (!walkForward && walkBack && !walkLeft && walkRight) {
                return { isMoving: true, heading: -QUARTER_PI - HALF_PI };
            } else {
                return { isMoving: false, heading: 0 };
            }
        }
    }

    get run() {
        if (this.touchButtonADown) {
            return true;
        } else {
            return keyIsDown(16); // Shift
        }
    }

    get jump() {
        if (this.touchButtonBDown) {
            this.touchButtonBDown = false;
            return true;
        } else {
            return keyIsDown(32); // Space
        }
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

    // draw(posX, posY, posZ, dirX, dirY, dirZ) {
    //     push();

    //     translate(posX + (dirX * 90), posY + (dirY * 90), posZ + (sin(dirZ * HALF_PI) * 90));
    //     let vXY = createVector(dirX, dirY);
    //     rotateZ(vXY.heading());
    //     rotateY((PI + HALF_PI) - (dirZ * HALF_PI));

    //     rotateZ(-HALF_PI);

    //     // texture(arrowsTexture);
    //     // plane(32, 32);

    //     // texture(arrowsTexture);
    //     // translate(-50 * 2, 0, 0);
    //     // plane(32, 32);

    //     // Arrows
    //     texture(arrowsTexture);
    //     translate(-48, 32, 0);
    //     plane(32, 32);

    //     // Button A
    //     translate(80, 8, 0);
    //     texture(buttonATexture);
    //     plane(16, 16);

    //     // Button B
    //     translate(24, -16, 0);
    //     texture(buttonBTexture);
    //     plane(16, 16);

    //     pop();
    // }
}