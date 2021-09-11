"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const bot = new src_1.default("ws://158.69.123.15:8090/");
bot.on("open", () => {
    setInterval(() => {
        bot.spawn("ddddddddddddddd");
    }, 1000);
});
bot.on("close", (code) => {
    console.log("bot closed", code);
});
bot.on("error", (error) => {
    console.log("bot error", error);
});
bot.on("message", (msg, isBinary) => {
    bot.send("input", {
        mouse: new src_1.default.Vector(100, 100),
        flags: {
            playerIsMoving: true,
        },
    });
});
//# sourceMappingURL=bot.js.map