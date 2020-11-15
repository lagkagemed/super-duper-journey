class Controls {
    constructor() {
        // Real values
        const dpadRReal = min(windowWidth / 4, windowHeight / 4);
        const dpadDeadzoneRReal = dpadRReal / 4;
        const dpadXReal = dpadRReal + (dpadRReal / 4);
        const dpadYReal = windowHeight - (dpadRReal + (dpadRReal / 4));

        const buttonDuckJumpRReal = min(windowWidth / 4, windowHeight / 4);
        const buttonDuckJumpXReal = windowWidth - buttonDuckJumpRReal - (buttonDuckJumpRReal / 4);
        const ButtonDuckJumpYReal = windowHeight - (buttonDuckJumpRReal + (buttonDuckJumpRReal / 4));

        // const buttonARReal = min(windowWidth / 5, windowHeight / 5);
        // const buttonAXReal = windowWidth - (buttonARReal * 3);
        // const ButtonAYReal = windowHeight - (buttonARReal + (buttonARReal / 4));

        // const buttonBRReal = min(windowWidth / 6, windowHeight / 6);
        // const buttonBXReal = windowWidth - (buttonBRReal + (buttonBRReal / 4));
        // const ButtonBYReal = windowHeight - (buttonBRReal * 3);

        // TODO BB 2020-11-13. Testing windowWidth & windowHeight instead of gameWidth & gameHeight for scaled values with new touch event.
        // Scaled values
        const dpadR = min(windowWidth / 4, windowHeight / 4);
        const dpadDeadzoneR = dpadR / 4;
        const dpadX = dpadR + (dpadR / 4);
        const dpadY = windowHeight - (dpadR + (dpadR / 4));
        this.dpadR = dpadR;
        this.dpadDeadzoneR = dpadDeadzoneR;
        this.dpadX = dpadX;
        this.dpadY = dpadY;

        const buttonDuckJumpR = min(windowWidth / 4, windowHeight / 4);
        const buttonDuckJumpX = windowWidth - buttonDuckJumpR - (buttonDuckJumpR / 4);
        const buttonDuckJumpY = windowHeight - (buttonDuckJumpR + (buttonDuckJumpR / 4));
        this.buttonDuckJumpR = buttonDuckJumpR;
        this.buttonDuckJumpX = buttonDuckJumpX;
        this.buttonDuckJumpY = buttonDuckJumpY;

        // const buttonAR = min(gameWidth / 5, gameHeight / 5);
        // const buttonAX = gameWidth - (buttonAR * 3);
        // const ButtonAY = gameHeight - (buttonAR + (buttonAR / 4));
        // this.buttonAR = buttonAR;
        // this.buttonAX = buttonAX;
        // this.ButtonAY = ButtonAY;

        // const buttonBR = min(gameWidth / 6, gameHeight / 6);
        // const buttonBX = gameWidth - (buttonBR + (buttonBR / 4));
        // const ButtonBY = gameHeight - (buttonBR * 3);
        // this.buttonBR = buttonBR;
        // this.buttonBX = buttonBX;
        // this.ButtonBY = ButtonBY;

        // Display controls at real values
        let touchControls = document.getElementById("touch-controls");
        if (!isMobile) {
            touchControls.style.visibility = "hidden";
        } else {
            let dPad = document.getElementById("d-pad");
            dPad.style.left = dpadXReal - dpadRReal + "px";
            dPad.style.top = dpadYReal - dpadRReal + "px";
            dPad.style.width = (dpadRReal * 2) + "px";
            dPad.style.height = (dpadRReal * 2) + "px";

            let dPadDeadzone = document.getElementById("d-pad-deadzone");
            dPadDeadzone.style.left = dpadXReal - dpadDeadzoneRReal + "px";
            dPadDeadzone.style.top = dpadYReal - dpadDeadzoneRReal + "px";
            dPadDeadzone.style.width = (dpadDeadzoneRReal * 2) + "px";
            dPadDeadzone.style.height = (dpadDeadzoneRReal * 2) + "px";

            let buttonDuckJump = document.getElementById("button-duck-jump");
            buttonDuckJump.style.left = buttonDuckJumpXReal - buttonDuckJumpRReal + "px";
            buttonDuckJump.style.top = ButtonDuckJumpYReal - buttonDuckJumpRReal + "px";
            buttonDuckJump.style.width = (buttonDuckJumpRReal * 2) + "px";
            buttonDuckJump.style.height = (buttonDuckJumpRReal * 2) + "px";

            // let buttonA = document.getElementById("button-a");
            // buttonA.style.left = buttonAXReal - buttonARReal + "px";
            // buttonA.style.top = ButtonAYReal - buttonARReal + "px";
            // buttonA.style.width = (buttonARReal * 2) + "px";
            // buttonA.style.height = (buttonARReal * 2) + "px";

            // let buttonB = document.getElementById("button-b");
            // buttonB.style.left = buttonBXReal - buttonBRReal + "px";
            // buttonB.style.top = ButtonBYReal - buttonBRReal + "px";
            // buttonB.style.width = (buttonBRReal * 2) + "px";
            // buttonB.style.height = (buttonBRReal * 2) + "px";

            touchControls.style.visibility = "visible";
        }

        // Move
        this.touchDPadId = -1;
        this.touchDPadV = createVector(0, 0);
        this.touchIsMoving = false;
        this.touchDPadDoubleTapTimeLast = 0;
        this.touchIsRunning = false;

        this.touchButtonDuckJumpId = -1;
        this.touchButtonDuckDown = false;
        this.touchButtonJumpDown = false;

        // this.touchButtonAId = -1;
        // this.touchButtonADown = false;

        // this.touchButtonBId = -1;
        // this.touchButtonBDown = false;

        this.keyForwardDoubleTapTimeLast = 0;
        this.keyIsRunning = false;

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

        const lookSpeedKeys = 0.04;
        this.lookSpeedKeys = lookSpeedKeys;

        this.mouseMovementX = 0;
        this.mouseMovementY = 0;

        // Keys
        const keyMoveForward = 87; // W
        const keyMoveBack = 83; // S
        const keyMoveLeft = 65; // A
        const keyMoveRight = 68; // D
        const keyDuck = 17; // Ctrl
        const keyJump = 32; // Space
        const keyLookUp = UP_ARROW; // Arrow Up
        const keyLookDown = DOWN_ARROW; // Arrow Down
        const keyLookLeft = LEFT_ARROW; // Arrow Left
        const keyLookRight = RIGHT_ARROW; // Arrow Right
        this.keyMoveForward = keyMoveForward;
        this.keyMoveBack = keyMoveBack;
        this.keyMoveLeft = keyMoveLeft;
        this.keyMoveRight = keyMoveRight;
        this.keyDuck = keyDuck;
        this.keyJump = keyJump;
        this.keyLookUp = keyLookUp;
        this.keyLookDown = keyLookDown;
        this.keyLookLeft = keyLookLeft;
        this.keyLookRight = keyLookRight;
    }

    handleKeyPressed(key) {
        switch (key) {
            case this.keyMoveForward:
                let timeNow = millis();
                if (timeNow - this.keyForwardDoubleTapTimeLast < 350) {
                    // Run
                    this.keyIsRunning = true;
                } else {
                    // Walk
                    this.keyIsRunning = false;
                }
                this.keyForwardDoubleTapTimeLast = timeNow;
                break;
            default:
        }
    }

    handleKeyReleased() {
        if (!keyIsDown(this.keyMoveForward)) {
            this.keyIsRunning = false;
        }
    }

    handleTouchStarted(event) {
        if (isMobile) {
            if (event.touches.length > 0 &&
                (this.touchDPadId === -1 ||
                    this.touchButtonDuckJumpId === -1 ||
                    // this.touchButtonAId === -1 ||
                    // this.touchButtonBId === -1 ||
                    this.touchLookId === -1)) {
                for (let i = 0; i < event.touches.length; i++) {
                    let id = event.touches[i].identifier;
                    if (id === this.touchDPadId)
                        continue;
                    if (id === this.touchButtonDuckJumpId)
                        continue;
                    // if (id === this.touchButtonAId)
                    //     continue;
                    // if (id === this.touchButtonBId)
                    //     continue;
                    else if (id === this.touchLookId)
                        continue;

                    let x = event.touches[i].pageX;
                    let y = event.touches[i].pageY;

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
                            }
                            this.touchDPadDoubleTapTimeLast = timeNow;

                            this.setTouchDPadVector(x, y);

                            // socket.emit('log', "Started touchDPadId: " + id);
                            break;
                        }
                    }

                    // Duck / Jump
                    if (this.touchButtonDuckJumpId === -1) {
                        if (x >= this.buttonDuckJumpX - this.buttonDuckJumpR &&
                            x <= this.buttonDuckJumpX + this.buttonDuckJumpR &&
                            y >= this.buttonDuckJumpY - this.buttonDuckJumpR &&
                            y <= this.buttonDuckJumpY + this.buttonDuckJumpR) {
                            this.touchButtonDuckJumpId = id;
                            this.setTouchButtonDuckJumpDown(y);
                            // socket.emit('log', "Started touchButtonDuckJumpId: " + id);
                            break;
                        }
                    }

                    // // A
                    // if (this.touchButtonAId === -1) {
                    //     if (dist(x, y, this.buttonAX, this.ButtonAY) <= this.buttonAR) {
                    //         this.touchButtonAId = id;
                    //         this.touchButtonADown = true;
                    //         // socket.emit('log', "Started touchButtonAId: " + id);
                    //         break;
                    //     }
                    // }

                    // // B
                    // if (this.touchButtonBId === -1) {
                    //     if (dist(x, y, this.buttonBX, this.ButtonBY) <= this.buttonBR) {
                    //         this.touchButtonBId = id;
                    //         this.touchButtonBDown = true;
                    //         // socket.emit('log', "Started touchButtonBId: " + id);
                    //         break;
                    //     }
                    // }

                    // Look
                    if (this.touchLookId === -1) {
                        this.touchLookId = id;
                        this.touchLookXLast = x;
                        this.touchLookYLast = y;
                        // socket.emit('log', "Started touchLookId: " + id);
                        break;
                    }
                }
            }
        }
    }

    handleTouchEnded(event) {
        if (isMobile) {
            if (event.touches.length > 0) {
                // Move
                if (this.touchDPadId != -1) {
                    let found = false;
                    for (let i = 0; i < event.touches.length; i++) {
                        if (event.touches[i].identifier === this.touchDPadId) {
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

                // Duck / Jump
                if (this.touchButtonDuckJumpId != -1) {
                    let found = false;
                    for (let i = 0; i < event.touches.length; i++) {
                        if (event.touches[i].identifier === this.touchButtonDuckJumpId) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        this.touchButtonDuckJumpId = -1;
                        this.touchButtonDuckDown = false;
                        this.touchButtonJumpDown = false;
                        // socket.emit('log', "Stopped touchButtonDuckJumpId");
                    }
                }

                // // A
                // if (this.touchButtonAId != -1) {
                //     let found = false;
                //     for (let i = 0; i < event.touches.length; i++) {
                //         if (event.touches[i].identifier === this.touchButtonAId) {
                //             found = true;
                //             break;
                //         }
                //     }
                //     if (!found) {
                //         this.touchButtonAId = -1;
                //         this.touchButtonADown = false;
                //         // socket.emit('log', "Stopped touchButtonAId");
                //     }
                // }

                // // B
                // if (this.touchButtonBId != -1) {
                //     let found = false;
                //     for (let i = 0; i < event.touches.length; i++) {
                //         if (event.touches[i].identifier === this.touchButtonBId) {
                //             found = true;
                //             break;
                //         }
                //     }
                //     if (!found) {
                //         this.touchButtonBId = -1;
                //         this.touchButtonBDown = false;
                //         // socket.emit('log', "Stopped touchButtonBId");
                //     }
                // }

                // Look
                if (this.touchLookId != -1) {
                    let found = false;
                    for (let i = 0; i < event.touches.length; i++) {
                        if (event.touches[i].identifier === this.touchLookId) {
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

                this.touchButtonDuckJumpId = -1;
                this.touchButtonDuckDown = false;
                this.touchButtonJumpDown = false;

                // this.touchButtonAId = -1;
                // this.touchButtonADown = false;

                // this.touchButtonBId = -1;
                // this.touchButtonBDown = false;

                this.touchLookId = -1;
                // socket.emit('log', "Stopped all ids");
            }
        }
    }

    setTouchDPadVector(x, y) {
        this.touchDPadV.set(this.dpadX - x, y - this.dpadY);

        // TODO BB 2020-10-14. Maybe implement restrict to 8 direction movement.
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

    setTouchButtonDuckJumpDown(y) {
        if (y < this.buttonDuckJumpY) {
            this.touchButtonDuckDown = false;
            this.touchButtonJumpDown = true;
        } else {
            this.touchButtonDuckDown = true;
            this.touchButtonJumpDown = false;
        }
    }

    handleTouchMoved(event) {
        if (isMobile) {
            if (event.touches.length > 0) {
                for (let i = 0; i < event.touches.length; i++) {
                    let id = event.touches[i].identifier;
                    let x = event.touches[i].pageX;
                    let y = event.touches[i].pageY;
                    if (this.touchDPadId === id) {
                        // Move
                        this.setTouchDPadVector(x, y);
                    } else if (this.touchButtonDuckJumpId === id) {
                        // Duck / Jump
                        this.setTouchButtonDuckJumpDown(y);
                    } else if (this.touchLookId === id) {
                        // Look
                        this.touchLookUpDown = (y - this.touchLookYLast) * gameScale;
                        this.touchLookYLast = y;
                        this.touchLookLeftRight = (this.touchLookXLast - x) * gameScale;
                        this.touchLookXLast = x;
                    }
                }
            }
        }
    }

    handleMouseMoved(event) {
        this.mouseMovementX = event.movementX;
        this.mouseMovementY = event.movementY;
    }

    update() {

    }

    get move() {
        let isMoving = false;
        let isRunning = false;
        let heading = 0;

        if (this.touchIsMoving) {
            heading = this.touchDPadV.heading() + HALF_PI;
            if (this.touchDPadV.mag() > this.dpadDeadzoneR) {
                isMoving = true;
            } else if (heading >= -QUARTER_PI && heading <= QUARTER_PI) {
                isMoving = true;
            }
        } else {
            let walkForward = keyIsDown(this.keyMoveForward);
            let walkBack = keyIsDown(this.keyMoveBack);
            let walkLeft = keyIsDown(this.keyMoveLeft);
            let walkRight = keyIsDown(this.keyMoveRight);
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
            } else {
                this.keyIsRunning = false;
            }
        }

        if (this.touchIsRunning || this.keyIsRunning) {
            if (heading >= -QUARTER_PI && heading <= QUARTER_PI) {
                isRunning = true;
            } else {
                this.touchIsRunning = false;
                this.keyIsRunning = false;
            }
        }

        return { isMoving: isMoving, isRunning: isRunning, heading: heading };
    }

    get jump() {
        // if (this.touchButtonADown) {
        if (this.touchButtonJumpDown) {
            return true;
        } else {
            return keyIsDown(this.keyJump);
        }
    }

    get duck() {
        // if (this.touchButtonBDown) {
        if (this.touchButtonDuckDown) {
            return true;
        } else {
            return keyIsDown(this.keyDuck);
        }
    }

    get lookUpDown() {
        let look = 0;

        if (this.touchLookUpDown != 0) {
            look = this.touchLookUpDown / this.touchLookSteps;
            this.touchLookUpDown = 0;
        } else if (keyIsDown(this.keyLookUp)) {
            look = -this.lookSpeedKeys;
        } else if (keyIsDown(this.keyLookDown)) {
            look = this.lookSpeedKeys;
        } else if (!isMobile && fullscreen()) {
            look = this.mouseMovementY / this.touchLookSteps;
            this.mouseMovementY = 0;
        }

        return look;
    }

    get lookLeftRight() {
        let look = 0;

        if (this.touchLookLeftRight != 0) {
            look = this.touchLookLeftRight / this.touchLookSteps;
            this.touchLookLeftRight = 0;
        } else if (keyIsDown(this.keyLookLeft)) {
            look = this.lookSpeedKeys;
        } else if (keyIsDown(this.keyLookRight)) {
            look = -this.lookSpeedKeys;
        } else if (!isMobile && fullscreen()) {
            look = -this.mouseMovementX / this.touchLookSteps;
            this.mouseMovementX = 0;
        }

        return look;
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