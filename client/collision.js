function testColPlayer(object) {
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
}

function testColPlayerList(list) {
    for (let i in list) {
        let object = list[i];
        testColPlayer(object);
    }
}