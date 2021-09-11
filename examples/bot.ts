import BrutalSocket from "../src"
import ParsedClientboundPacket from "../src/interfaces/parsedClientboundPacket"

const bot: BrutalSocket = new BrutalSocket("ws://158.69.123.15:8100/")

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

bot.on("message", (packet: ParsedClientboundPacket) => {
  bot.send("input", {
    mouse: new BrutalSocket.Vector(100, 100),
    flags: {
      playerIsMoving: true,
    },
  })
})
