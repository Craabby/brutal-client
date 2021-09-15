"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const bot = new src_1.default("ws://139.162.30.54:8080/", {
    rejectUnauthorized: false,
});
bot.on("open", () => {
    setInterval(() => {
        bot.spawn("brutal-client");
    }, 1000);
});
bot.on("close", (code) => {
    console.log("bot closed", code);
});
bot.on("error", (error) => {
    console.log("bot error", error);
});
bot.on("message", (packet) => {
    bot.spawn("brutal-clientGH");
    if (packet.type === "leaderboard") {
        console.log(packet.data);
        console.log(bot.entities);
        // bot.socket.close();
        // process.exit()
    }
});
//# sourceMappingURL=leaderboardLogger.js.map