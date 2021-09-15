"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class GreenSentinel {
    constructor(type) {
        this.subtype = 0;
        this.angle = 0;
        this.positive = 0;
        this.hue = 0;
        this.impulseValue = 0;
        this.position = new vector_1.default(0, 0);
        this.subtype = type;
    }
    updateNetwork(packet, isCreation) {
        packet.u16(); // again calvin?
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
        this.angle = packet.f32();
        if (packet.u8())
            this.impulseValue = 1;
        if (isCreation) {
            this.positive = packet.u8();
            this.hue = this.positive ? 116 : 0;
        }
    }
    deleteNetwork(packet) {
        packet.u8();
    }
}
exports.default = GreenSentinel;
//# sourceMappingURL=greenSentinel.js.map