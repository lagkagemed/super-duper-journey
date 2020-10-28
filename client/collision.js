function testColPlayer(object) {

    // check if colliding
    colBoxSize = 25;
    changeX = false;
    changeY = false;
    changeZ = false;

    if ((posX + colBoxSize) > (object.x - (object.width / 2))
    && (posX - colBoxSize) < (object.x + (object.width / 2))
    && (posY + colBoxSize) > (object.y - (object.depth / 2))
    && (posY - colBoxSize) < (object.y + (object.depth / 2))
    && posZ > (object.z - (object.height / 2))
    && (posZ - playerHeight) < (object.z + (object.height / 2))) {
        
        // check if posX is the problem
        if ((posX + colBoxSize) > (object.x - (object.width / 2))
        && (posX - colBoxSize) < (object.x + (object.width / 2))
        && (oldPosY + colBoxSize) > (object.y - (object.depth / 2))
        && (oldPosY - colBoxSize) < (object.y + (object.depth / 2))
        && oldPosZ > (object.z - (object.height / 2))
        && (oldPosZ - playerHeight) < (object.z + (object.height / 2))) changeX = true;

        // check if posY is the problem
        if ((oldPosX + colBoxSize) > (object.x - (object.width / 2))
        && (oldPosX - colBoxSize) < (object.x + (object.width / 2))
        && (posY + colBoxSize) > (object.y - (object.depth / 2))
        && (posY - colBoxSize) < (object.y + (object.depth / 2))
        && oldPosZ > (object.z - (object.height / 2))
        && (oldPosZ - playerHeight) < (object.z + (object.height / 2))) changeY = true;

        // check if posZ is the problem
        if ((oldPosX + colBoxSize) > (object.x - (object.width / 2))
        && (oldPosX - colBoxSize) < (object.x + (object.width / 2))
        && (oldPosY + colBoxSize) > (object.y - (object.depth / 2))
        && (oldPosY - colBoxSize) < (object.y + (object.depth / 2))
        && posZ > (object.z - (object.height / 2))
        && (posZ - playerHeight) < (object.z + (object.height / 2))) {
            changeZ = true;
            standing = true;
            physZVel = 0;
            }
        }
    if (changeX) posX = oldPosX;
    if (changeY) posY = oldPosY;
    if (changeZ) posZ = oldPosZ;

    // check unduck
    if (unduck > -10) unduck--;
    if ((posX + colBoxSize) > (object.x - (object.width / 2))
    && (posX - colBoxSize) < (object.x + (object.width / 2))
    && (posY + colBoxSize) > (object.y - (object.depth / 2))
    && (posY - colBoxSize) < (object.y + (object.depth / 2))
    && (posZ) > (object.z - (object.height / 2))
    && (posZ - playerHeightStand) < (object.z + (object.height / 2))) {
        unduck = 20;
    }

    /*
    // check head colliding
    if ((posZ - (playerHeight - 50)) > (object.z + (object.height / 2))
    && (posZ - playerHeight) < (object.z - (object.height / 2))
    && (posX + 25) > (object.x - (object.width / 2))
    && (posX - 25) < (object.x + (object.width / 2))
    && (posY + 25) > (object.y - (object.depth / 2))
    && (posY - 25) < (object.y + (object.depth / 2))) {
        posZ = (object.z + (object.height / 2) + (playerHeight));
        physZVel = 10;
    }

    // check front colliding
    if ((posX + 50) > (object.x - (object.width / 2))
    && posX < (object.x + (object.width / 2))
    && (posY + 25) > (object.y - (object.depth / 2))
    && (posY - 25) < (object.y + (object.depth / 2))
    && (posZ - 50) < (object.z + (object.height / 2))
    && (posZ - (playerHeight - 50)) > (object.z - (object.height / 2))) {
        posX = (object.x - (object.width / 2) - 50);
    }

    // check right side colliding
    if ((posY - 50) < (object.y + (object.depth / 2))
    && posY > (object.y - (object.depth / 2))
    && (posX + 25) > (object.x - (object.width / 2))
    && (posX - 25) < (object.x + (object.width / 2))
    && (posZ - 50) < (object.z + (object.height / 2))
    && (posZ - (playerHeight - 50)) > (object.z - (object.height / 2))) {
        posY = (object.y + (object.depth / 2) + 50);
    }

    // check left side colliding
    if ((posY + 50) > (object.y - (object.depth / 2))
    && posY < (object.y + (object.depth / 2))
    && (posX + 25) > (object.x - (object.width / 2))
    && (posX - 25) < (object.x + (object.width / 2))
    && (posZ - 50) < (object.z + (object.height / 2))
    && (posZ - (playerHeight - 50)) > (object.z - (object.height / 2))) {
        posY = (object.y - (object.depth / 2) - 50);
    }

    // check back colliding
    if ((posX - 50) < (object.x + (object.width / 2))
    && posX > (object.x - (object.width / 2))
    && (posY + 25) > (object.y - (object.depth / 2))
    && (posY - 25) < (object.y + (object.depth / 2))
    && (posZ - 50) < (object.z + (object.height / 2))
    && (posZ - (playerHeight - 50)) > (object.z - (object.height / 2))) {
        posX = (object.x + (object.width / 2) + 50);
    }

    // check if feet is colliding
    if (posZ > (object.z - (object.height / 2))
    && (posZ - 25) < (object.z + (object.height / 2))
    && (posX + 25) > (object.x - (object.width / 2))
    && (posX - 25) < (object.x + (object.width / 2))
    && (posY + 25) > (object.y - (object.depth / 2))
    && (posY - 25) < (object.y + (object.depth / 2))) {
        posZ = (object.z - (object.height / 2));
        standing = true;
    }
    */


}

function testColPlayerList(list) {
    for (let i in list) {
        let object = list[i];
        testColPlayer(object);
    }
}

function setOldPos(){
    oldPosX = posX;
    oldPosY = posY;
    oldPosZ = posZ;
}