"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
function parseLeaderboard(packetHeader, data) {
    const reader = new coder_1.Reader(data);
    reader.offset = 1;
    const leaderboard = [];
    while (true) {
        const playerId = reader.u16();
        if (playerId === 0)
            break; // null terminated
        let score = 0;
        if (packetHeader === 0xa5)
            score = reader.u16(); // i really hate how this game's packets work
        else
            score = reader.u32();
        const name = reader.string();
        const entry = {
            id: playerId,
            score,
            name,
        };
        leaderboard.push(entry);
    }
    return {
        type: "leaderboard",
        data: {
            leaderboard,
        },
    };
}
exports.default = parseLeaderboard;
module.exports = parseLeaderboard;
//# sourceMappingURL=leaderboard.js.map