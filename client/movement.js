// Movement basics
function jumpCombo() {
    if (jumpComboTimer == 0) jumpComboCounter = 0;
    jumpComboCounter++;
    jumpComboTimer = 10;
    if (jumpComboCounter == 1) physJump = -30;
    if (jumpComboCounter == 2) physJump = -45;
    if (jumpComboCounter == 3) {
        physJump = -60;
        jumpComboCounter = 0;
        jumpSalto = 0.002;
    }
}

function basicMovement() {
    let move = controls.move;
    let jump = controls.jump;
    let duck = controls.duck;
    let walkDirV = createVector(lookX, lookY);

    if (move.isMoving) {
        walkDirV.rotate(move.heading);
        if (!move.isRunning) {
            physXYVel = physMaxSpdWalk;
            posX += walkDirV.x * physXYVel;
            posY += walkDirV.y * physXYVel;
        } else {
            if (physXYVel < 10) physXYVel = 10;
            physXYVel += 0.5;
            if (physXYVel > physMaxSpdRun) physXYVel = physMaxSpdRun;
            posX += walkDirV.x * physXYVel;
            posY += walkDirV.y * physXYVel;
        }
    }

    if (!noClip) {
        if (!playerIsDucking && duck) {
            playerHeight = playerHeightDuck;
            if (!standing) { // Only pull up legs when jumping.
                posZ -= playerHeightStand - playerHeightDuck;
            }
            playerIsDucking = true;
        } else if (playerIsDucking && !duck) {
            testColPlayerList(PLATFORM_LIST);
            if (unduck < 0) {
                playerHeight = playerHeightStand;
                if (!standing) { // Only pull down legs when jumping.
                    posZ += playerHeightStand - playerHeightDuck;
                }
                playerIsDucking = false;
            }
        }

        if (jump && standing) {
            jumpCombo();
            physZVel = physJump;
            standing = false;
        }
    } else {
        if (jump)
            physZVel = -10;
        else if (duck)
            physZVel = 10;
        else
            physZVel = 0;
    }

    updateZVel();
    if (!noClip) {
        standing = false;
        testColPlayerList(PLATFORM_LIST);
        if (posZ > 3000) respawn();
    }
}

function updateZVel() {
    if (!noClip) {
        physZVel += physGravity;
        if (physZVel > physZVelMax) physZVel = physZVelMax;
    }
    posZ += physZVel;
}

function updateXYVel() {
    physZVel += physGravity;
    if (physZVel > physZVelMax) physZVel = physZVelMax;
    posZ += physZVel;
}