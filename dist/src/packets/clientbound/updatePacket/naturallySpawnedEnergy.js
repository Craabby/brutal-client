"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class NaturallySpawnedEnergy {
    constructor() {
        this.position = new vector_1.default(0, 0);
        this.angle = 0;
        this.hue = 0;
        this.name = "";
    }
    updateNetwork(packet, isCreation) {
        packet.u16(); // calvin wtf is this
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
        this.angle = packet.f32();
        if (isCreation) {
            this.hue = packet.u16();
        }
    }
    deleteNetwork(packet) {
        packet.u8();
    }
}
exports.default = NaturallySpawnedEnergy;
//# sourceMappingURL=naturallySpawnedEnergy.js.map