"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class MapObject2 {
    constructor(type) {
        this.type = 0;
        this.angle = 0;
        this.shapeIndex = 0;
        this.pulsing = false;
        this.position = new vector_1.default(0, 0);
        this.type = type;
    }
    updateNetwork(packet, isCreation) {
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
        this.angle = packet.f32();
        this.shapeIndex = packet.u8();
        let c;
        let u;
        let coreRotation;
        if (this.type === 0) {
            if (packet.u8()) {
            }
            c = packet.u8();
        }
        else if (this.type === 5) {
            let g1 = packet.u8();
            u = g1 & -9; // calvin youre wack
            if (this.angle & 8)
                this.pulsing = true;
            coreRotation = packet.f32();
        }
    }
    deleteNetwork() { }
}
exports.default = MapObject2;
//# sourceMappingURL=mapObject2.js.map