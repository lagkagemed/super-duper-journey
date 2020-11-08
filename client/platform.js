let PLATFORM_LIST = [];

let Platform = function (x, y, z, w, d, h, color, func) {
    let self = {
        x: x,
        y: y,
        z: z,
        width: w,
        depth: d,
        height: h,
        color: color,
        func: func
    }
    self.draw = function () {
        push();
        fill(this.color);
        translate(this.x, this.y, this.z);
        box(this.width, this.depth, this.height);
        pop();
    }
    PLATFORM_LIST.push(self);
    return self;
}