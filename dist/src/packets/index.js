"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const serverbound = {
    ping: require("./serverbound/ping"),
    init: require("./serverbound/init"),
    spawn: require("./serverbound/spawn"),
    input: require("./serverbound/input"),
    // resizeWindow: 7,
    // click: 8,
};
const clientbound = {
    leaderboard: require("./clientbound/leaderboard"),
    update: require("./clientbound/update"),
    unknown: require("./clientbound/unknown"),
};
const clientboundOpcodes = {
    [0xb5]: "leaderboard",
    [0xb4]: "update",
    [0xa0]: "unknown",
    [0xa1]: "unknown",
    [0xa4]: "unknown",
    [0xa6]: "unknown",
    [0x01]: "unknown",
    [0x00]: "unknown",
};
function encode(type, data, bot) {
    if (!serverbound.hasOwnProperty(type)) {
        throw new Error(`Unsuppored packet '${type}'`);
    }
    return serverbound[type](data, bot);
}
exports.encode = encode;
function decode(data, bot) {
    const opcode = new Uint8Array(data)[0];
    const type = clientboundOpcodes[opcode];
    return clientbound[type](data, bot);
}
exports.decode = decode;
//# sourceMappingURL=index.js.map