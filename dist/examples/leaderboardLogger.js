"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
let globalLeaderboard = [];
for (let i = 0; i < 200; i++) {
    let basePort = 8080;
    if (i > 100)
        basePort = 9000;
    const bot = new src_1.default(`ws://51.91.214.104:${basePort + i}/`);
    bot.on("open", () => {
        setInterval(() => {
            bot.spawn("brutal-client");
        }, 1000);
    });
    bot.on("close", (code) => {
        // console.log("bot closed", code, bot.server)
    });
    bot.on("error", (error) => {
        // console.log("bot error", error, bot.server)
    });
    bot.on("message", (packet) => {
        if (packet.type === "leaderboard") {
            globalLeaderboard = globalLeaderboard.concat(...packet.data.leaderboard);
            bot.socket.close();
            // process.exit()
        }
    });
}
globalLeaderboard = globalLeaderboard.sort((a, b) => a.score - b.score);
setTimeout(() => console.log(globalLeaderboard), 4000); // my internet is trash
//# sourceMappingURL=leaderboardLogger.js.map