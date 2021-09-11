"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
const serverbound = {
    ping: require("./serverbound/ping"),
    init: require("./serverbound/init"),
    spawn: require("./serverbound/spawn"),
    input: require("./serverbound/input"),
    // resizeWindow: 7,
    // click: 8,
};
function encode(type, data) {
    if (!serverbound.hasOwnProperty(type)) {
        throw new Error(`Unsuppored packet '${type}'`);
    }
    return serverbound[type](data);
}
exports.encode = encode;
//# sourceMappingURL=index.js.map