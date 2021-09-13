import BrutalSocket from "../src"
import ParsedClientboundPacket from "../src/interfaces/parsedClientboundPacket"
import LeaderboardEntry from "../src/interfaces/leaderboardEntry"

let globalLeaderboard: LeaderboardEntry[] = []

for (let i = 0; i < 200; i++) {
  let basePort: number = 8080
  if (i > 100) basePort = 9000 // some servers are on port 9000 + something
  const bot: BrutalSocket = new BrutalSocket(
    `ws://51.91.214.104:${basePort + i}/`
  )

  bot.on("open", () => {
    setInterval(() => {
      bot.spawn("brutal-client")
    }, 1000)
  })

  bot.on("close", (code: number) => {
    // console.log("bot closed", code, bot.server)
  })
  bot.on("error", (error: Error) => {
    // console.log("bot error", error, bot.server)
  })

  bot.on("message", (packet: ParsedClientboundPacket) => {
    if (packet.type === "leaderboard") {
      globalLeaderboard = globalLeaderboard.concat(...packet.data.leaderboard)
      bot.socket.close()
      // process.exit()
    }
  })
}

globalLeaderboard = globalLeaderboard.sort((a, b) => a.score - b.score)
setTimeout(() => console.log(globalLeaderboard), 4000) // my internet is trash
