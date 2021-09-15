"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../../../vector");
class Player {
    constructor() {
        this.chainSegments = [];
        this.energy = 0;
        this.flailAngle = 0;
        this.flailRadius = 0;
        this.position = new vector_1.default(0, 0);
        this.flialPosition = new vector_1.default(0, 0);
        this.attached = false;
        this.attracting = false;
        this.invulnerable = false;
        this.shock = false;
        this.decay = false;
        this.still = false;
        this.inside = false;
        this.charging = false;
        this.redFlail = false;
        this.redFlailDepleted = false;
        this.name = "";
    }
    updateNetwork(packet, isCreation) {
        this.energy = packet.u8();
        this.position = new vector_1.default(packet.f32(), -packet.f32()).multiply(10);
        this.updateChainFlail(packet, isCreation);
        this.updateNetworkFlail(packet, isCreation);
    }
    updateChainFlail(packet, isCreation) {
        const chainSegmentsLength = packet.u8();
        for (let i = 0; i < chainSegmentsLength; i++) {
            this.chainSegments.push(new vector_1.default(packet.f32(), -packet.f32).multiply(10));
        }
    }
    updateNetworkFlail(packet, isCreation) {
        this.flialPosition = new vector_1.default(packet.f32(), -packet.f32).multiply(10);
        this.flailAngle = -packet.f32();
        this.flailRadius = packet.f32() * 10;
        const flags = packet.u16();
        this.attached = !!(flags & 1);
        this.attracting = !!(flags & 2);
        this.invulnerable = !!(flags & 4);
        this.shock = !!(flags & 8);
        this.decay = !!(flags & 16);
        this.still = !!(flags & 32);
        this.inside = !!(flags & 64);
        this.charging = !!(flags & 128);
        this.redFlail = !!(flags & 256);
        this.redFlailDepleted = !!(flags & 512);
        if (this.redFlailDepleted) {
            packet.u8(); // i dont think anyone really cares how much energy the red flial has left
        }
    }
    deleteNetwork() { } // you do literally nothing aside from `delete <id>` for the deletion packets lol
}
exports.default = Player;
//# sourceMappingURL=otherPlayer.js.map