"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
module.exports = (data) => {
    if (data == null)
        data = "";
    const writer = new coder_1.Writer();
    writer.u8(3);
    writer.string(data);
    return writer.packet;
};
//# sourceMappingURL=spawn.js.map