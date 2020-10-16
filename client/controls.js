class Controls {
    constructor() {
        const dpadR = min(windowWidth / 4, windowHeight / 4);
        const dpadX = dpadR + (dpadR / 4);
        const dpadY = windowHeight - (dpadR + (dpadR / 4));
        this.dpadR = dpadR;
        this.dpadX = dpadX;
        this.dpadY = dpadY;

        const buttonAR = min(windowWidth / 5, windowHeight / 5);
        const buttonAX = windowWidth - (buttonAR * 3);
        const ButtonAY = windowHeight - (buttonAR + (buttonAR / 4));
        this.buttonAR = buttonAR;
        this.buttonAX = buttonAX;
        this.ButtonAY = ButtonAY;

        const buttonBR = min(windowWidth / 6, windowHeight / 6);
        const buttonBX = windowWidth - (buttonBR + (buttonBR / 4));
        const ButtonBY = windowHeight - (buttonBR * 3);
        this.buttonBR = buttonBR;
        this.buttonBX = buttonBX;
        this.ButtonBY = ButtonBY;

        let touchControls = document.getElementById("touch-controls");
        if (!isMobile) {
            if (touchControls != null)
                touchControls.remove();
        } else {
            let dPad = document.getElementById("d-pad");
            dPad.style.left = dpadX - dpadR + "px";
            dPad.style.top = dpadY - dpadR + "px";
            dPad.style.width = (dpadR * 2) + "px";
            dPad.style.height = (dpadR * 2) + "px";

            let buttonA = document.getElementById("button-a");
            buttonA.style.left = buttonAX - buttonAR + "px";
            buttonA.style.top = ButtonAY - buttonAR + "px";
            buttonA.style.width = (buttonAR * 2) + "px";
            buttonA.style.height = (buttonAR * 2) + "px";

            let buttonB = document.getElementById("button-b");
            buttonB.style.left = buttonBX - buttonBR + "px";
            buttonB.style.top = ButtonBY - buttonBR + "px";
            buttonB.style.width = (buttonBR * 2) + "px";
            buttonB.style.height = (buttonBR * 2) + "px";

            touchControls.style.visibility = "visible";
        }

        // Move
        this.touchDPadId = -1;
        this.touchDPadV = createVector(0, 0);
        this.touchIsMoving = false;
        this.touchDPadDoubleTapTimeLast = 0;
        this.touchIsRunning = false;

        this.touchButtonAId = -1;
        this.touchButtonADown = false;

        this.touchButtonBId = -1;
        this.touchButtonBDown = false;

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

        const touchLookSteps = min(windowWidth, windowHeight) / 2;
        this.touchLookSteps = touchLookSteps;

        const lookSpeedKeys = 0.02;
        this.lookSpeedKeys = lookSpeedKeys;
    }

    handleTouchStarted() {
        if (touches.length > 0 && (this.touchDPadId === -1 || this.touchButtonAId === -1 || this.touchButtonBId === -1 || this.touchLookId === -1)) {
            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].id;
                if (id === this.touchDPadId)
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
                if (this.touchDPadId === -1) {
                    if (dist(x, y, this.dpadX, this.dpadY) <= this.dpadR) {
                        this.touchDPadId = id;
                        this.touchIsMoving = true;

                        let timeNow = millis();
                        if (timeNow - this.touchDPadDoubleTapTimeLast < 350) {
                            // Run
                            this.touchIsRunning = true;
                        } else {
                            // Walk
                            this.touchIsRunning = false;
                            this.setTouchDPadVector(x, y);
                        }
                        this.touchDPadDoubleTapTimeLast = timeNow;

                        // socket.emit('log', "Started touchDPadId: " + id);
                        break;
                    }
                }

                // A
                if (this.touchButtonAId === -1) {
                    if (dist(x, y, this.buttonAX, this.ButtonAY) <= this.buttonAR) {
                        this.touchButtonAId = id;
                        this.touchButtonADown = true;
                        // socket.emit('log', "Started touchButtonAId: " + id);
                        break;
                    }
                }

                // B
                if (this.touchButtonBId === -1) {
                    if (dist(x, y, this.buttonBX, this.ButtonBY) <= this.buttonBR) {
                        this.touchButtonBId = id;
                        this.touchButtonBDown = true;
                        // socket.emit('log', "Started touchButtonBId: " + id);
                        break;
                    }
                }

                // Look
                if (this.touchLookId === -1) {
                    this.touchLookId = id;
                    this.touchLookXLast = touches[i].x;
                    this.touchLookYLast = touches[i].y;
                    // socket.emit('log', "Started touchLookId: " + id);
                    break;
                }
            }
        }
    }

    handleTouchEnded() {
        if (touches.length > 0) {
            // Move
            if (this.touchDPadId != -1) {
                let found = false;
                for (let i = 0; i < touches.length; i++) {
                    if (touches[i].id === this.touchDPadId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.touchDPadId = -1;
                    this.touchIsMoving = false;
                    this.touchIsRunning = false;
                    // socket.emit('log', "Stopped touchDPadId");
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
                    this.touchButtonBDown = false;
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
            this.touchDPadId = -1;
            this.touchIsMoving = false;
            this.touchIsRunning = false;

            this.touchButtonAId = -1;
            this.touchButtonADown = false;

            this.touchButtonBId = -1;
            this.touchButtonBDown = false;

            this.touchLookId = -1;
            // socket.emit('log', "Stopped all ids");
        }
    }

    setTouchDPadVector(x, y) {
        this.touchDPadV.set(this.dpadX - x, y - this.dpadY);

        // TODO BB 2020-10-14. Implement restrict to 8 direction movement.
        // let heading = this.touchDPadV.heading();
        // if (heading >= 0 && heading < QUARTER_PI) {
        // } else if (heading >= QUARTER_PI && heading < HALF_PI) {
        // } else if (heading >= HALF_PI && heading < HALF_PI + QUARTER_PI) {
        // } else if (heading >= HALF_PI + QUARTER_PI && heading < PI) {
        // } else if (heading >= PI && heading < PI + QUARTER_PI) {
        // } else if (heading >= PI + QUARTER_PI && heading < PI + HALF_PI) {
        // } else if (heading >= PI + HALF_PI && heading < PI + HALF_PI + QUARTER_PI) {
        // } else if (heading >= PI + HALF_PI + QUARTER_PI && heading < PI + PI) {
        // }
    }

    update() {
        // Touch moved
        if (touches.length > 0) {
            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].id;
                let x = touches[i].x;
                let y = touches[i].y;
                if (this.touchDPadId === id) {
                    // Move
                    if (!this.touchIsRunning) {
                        this.setTouchDPadVector(x, y);
                    }
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

    get move() {
        let isMoving = false;
        let isRunning = false;
        let heading = 0;

        if (this.touchIsRunning || keyIsDown(16)) { // Shift
            isMoving = true;
            isRunning = true;
            heading = 0;
        } else if (this.touchIsMoving) {
            isMoving = true;
            heading = this.touchDPadV.heading() + HALF_PI;
        } else {
            let walkForward = keyIsDown(87); // W
            let walkBack = keyIsDown(83); // S
            let walkLeft = keyIsDown(65); // A
            let walkRight = keyIsDown(68); // D
            if (walkForward && !walkBack && !walkLeft && !walkRight) {
                isMoving = true;
                heading = 0;
            } else if (!walkForward && walkBack && !walkLeft && !walkRight) {
                isMoving = true;
                heading = PI;
            } else if (!walkForward && !walkBack && walkLeft && !walkRight) {
                isMoving = true;
                heading = HALF_PI;
            } else if (!walkForward && !walkBack && !walkLeft && walkRight) {
                isMoving = true;
                heading = -HALF_PI;
            } else if (walkForward && !walkBack && walkLeft && !walkRight) {
                isMoving = true;
                heading = QUARTER_PI;
            } else if (walkForward && !walkBack && !walkLeft && walkRight) {
                isMoving = true;
                heading = -QUARTER_PI;
            } else if (!walkForward && walkBack && walkLeft && !walkRight) {
                isMoving = true;
                heading = QUARTER_PI + HALF_PI;
            } else if (!walkForward && walkBack && !walkLeft && walkRight) {
                isMoving = true;
                heading = -QUARTER_PI - HALF_PI;
            }
        }

        return { isMoving: isMoving, isRunning: isRunning, heading: heading };
    }

    get jump() {
        if (this.touchButtonADown) {
            return true;
        } else {
            return keyIsDown(32); // Space
        }
    }

    get duck() {
        if (this.touchButtonBDown) {
            return true;
        } else {
            return keyIsDown(17); // Control
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