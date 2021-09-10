"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Object.freeze(this) // this can fix some issues with the js referencing stuff
    }
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    distance(vector) {
        const subtracted = this.subtract(vector);
        return Math.sqrt(Math.pow(subtracted.x, 2) + Math.pow(subtracted.y, 2)); // math.pow(a, b) is faster than a ** b but makes the code less readable
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    divideByVector(vector) {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }
    divideByNumber(scale) {
        return new Vector(this.x / scale, this.y / scale);
    }
    movePointByAngle(distance, angle) {
        // useful
        const vec = new Vector(distance * Math.cos(angle), distance * Math.sin(angle));
        return this.add(vec);
    }
    get mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    get dir() {
        return Math.atan2(this.y, this.x); // for Math.atan2 it actually takes the y param first for some reason
    }
    get normalizedX() {
        const mag = this.mag;
        const normalizedX = this.x / mag;
        return normalizedX;
    }
    get normalizedY() {
        const mag = this.mag;
        const normalizedY = this.y / mag;
        return normalizedY;
    }
}
exports.default = Vector;
//# sourceMappingURL=vector.js.map