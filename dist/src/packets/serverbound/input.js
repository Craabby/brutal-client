"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
module.exports = (data) => {
    const writer = new coder_1.Writer();
    let flags = 0;
    if (data.flags.playerIsMoving)
        flags |= 1;
    writer.u8(5);
    writer.f64(data.mouse.dir);
    writer.u8(flags);
    return writer.packet;
};
//# sourceMappingURL=input.js.map