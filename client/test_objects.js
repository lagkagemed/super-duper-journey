let TESTMODEL_LIST = [];

let TestModel = function (x, y, z, Mscale, MrotateX, MrotateY, MrotateZ, Mmodel, color) {
    let self = {
        x: x,
        y: y,
        z: z,
        Mscale: Mscale,
        MrotateX: MrotateX,
        MrotateY: MrotateY,
        MrotateZ: MrotateZ,
        Mmodel: Mmodel,
        color: color
    }
    self.draw = function () {
        push();
        fill(this.color);
        translate(this.x, this.y, this.z);
        scale(this.Mscale);
        rotateX(HALF_PI * this.MrotateX);
        rotateY(HALF_PI * this.MrotateY);
        rotateZ(HALF_PI * this.MrotateZ);
        if (this.Mmodel == 0) model(humanModel);
        if (this.Mmodel == 1) model(penguinModel);
        if (this.Mmodel == 2) model(duckModel);
        pop();
    }
    TESTMODEL_LIST.push(self);
    return self;
}