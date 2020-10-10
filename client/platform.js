let PLATFORM_LIST = [];

let Platform = function (x, y, z, w, h, d, color, tex) {
    let self = {
        x: x,
        y: y,
        z: z,
        width: w,
        height: h,
        depth: d,
        color: color,
        tex: tex
    }
    self.draw = function () {
        push();
        texture(this.tex);
        textureWrap(CLAMP);
        translate(this.x, this.y, this.z);
        box(this.width, this.height, this.depth);
        pop();
    }
    PLATFORM_LIST.push(self);
    return self;
}