"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class RedFlail {
    constructor() {
        this.position = new vector_1.default(0, 0);
    }
    updateNetwork(packet, isCreation) {
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
    }
    deleteNetwork(packet) {
        packet.u8();
    }
}
exports.default = RedFlail;
//# sourceMappingURL=redFlail.js.map