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
            posX += walkDirV.x * spdWalk;
            posY += walkDirV.y * spdWalk;
        } else {
            posX += walkDirV.x * spdRun;
            posY += walkDirV.y * spdRun;
        }
    }

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
}