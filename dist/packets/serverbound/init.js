"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
module.exports = (data) => {
    if (data == null)
        data = { width: 1000, height: 1000 };
    const writer = new coder_1.Writer();
    writer.u8(1);
    // divide stuff by 10 since the dev is wack
    writer.u16(data.width / 10);
    writer.u16(data.height / 10);
    return writer.packet;
};
//# sourceMappingURL=init.js.map