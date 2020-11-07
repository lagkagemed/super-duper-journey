let COLLISION_LIST = [];

function testColPlayer(object) {


    colBoxSize = 25;
    changeX = false;
    changeY = false;
    changeZ = false;

    // check if colliding
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
            if (oldPosZ < posZ) {
                standing = true;
                if (jumpComboTimer > 0) jumpComboTimer--;
            }
            physZVel = 0;
        }
        if (object.tex == 0) myColor = object.color;
        if (object.tex == 1) myModel = 0;
        if (object.tex == 2) myModel = 1;
        if (object.tex == 3) myModel = 2;
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
}

function testColPlayerList(list) {
    for (let i in list) {
        let object = list[i];
        testColPlayer(object);
    }
}

function setOldPos() {
    oldPosX = posX;
    oldPosY = posY;
    oldPosZ = posZ;
}

function collisionNearby(list) {
    for (let i in list) {
        let object = list[i];

    }

}