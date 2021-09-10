"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
module.exports = (data) => {
    const writer = new coder_1.Writer();
    writer.u8(0);
    return writer.packet;
};
//# sourceMappingURL=ping.js.map