import BrutalSocket from "../src"
import Vector from "../src/vector"

const bot: BrutalSocket = new BrutalSocket("ws://158.69.123.15:8090/")

bot.on("open", () => {
  setInterval(() => {
    bot.spawn("ddddddddddddddd")
  }, 1000)
})

bot.on("close", (code: number) => {
  console.log("bot closed", code)
})
bot.on("error", (error: Error) => {
  console.log("bot error", error)
})

bot.on("message", (msg: Buffer, isBinary: boolean) => {
  bot.send("input", {
    mouse: new Vector(100, 100),
    flags: {
      playerIsMoving: true,
      windowIsFocused: true,
    },
  })
})
