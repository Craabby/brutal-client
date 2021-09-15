"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class DeadPlayerCell {
    constructor() {
        this.energy = 0;
        this.angle = 0;
        this.hue = 0;
        this.type = 0;
        this.position = new vector_1.default(0, 0);
        this.name = "";
    }
    updateNetwork(packet, isCreation) {
        this.energy = packet.u16();
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
        this.angle = packet.f32();
        if (isCreation) {
            this.hue = packet.u16();
            this.type = packet.u8();
        }
    }
    deleteNetwork(packet) {
        packet.u8();
    }
}
exports.default = DeadPlayerCell;
//# sourceMappingURL=deadPlayerCell.js.map