"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
function parseLeaderboard(data, bot) {
    const reader = new coder_1.Reader(data);
    reader.offset = 1;
    const leaderboard = [];
    while (true) {
        const playerId = reader.u16();
        if (playerId === 0)
            break; // null terminated
        const score = reader.u32();
        const name = reader.string();
        const entry = {
            id: playerId,
            score,
            name,
        };
        leaderboard.push(entry);
    }
    const otherInfo = {}; // never claimed to be good at ts
    otherInfo.yourId = reader.u16();
    if (otherInfo.yourId !== 0) {
        bot.alive = true;
        otherInfo.score = reader.u32();
        otherInfo.yourRank = reader.u16();
        otherInfo.everyScoreCombined = reader.u32();
        otherInfo.scoreOnMap = reader.u32();
    }
    else {
        bot.alive = false;
        otherInfo.yourScore = 0;
        otherInfo.yourRank = 0;
    }
    return {
        type: "leaderboard",
        data: {
            leaderboard,
            otherInfo,
        },
    };
}
exports.default = parseLeaderboard;
module.exports = parseLeaderboard;
//# sourceMappingURL=leaderboard.js.map