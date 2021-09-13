import ParsedClientboundPacket from "../../interfaces/parsedClientboundPacket"
import LeaderboardEntry from "../../interfaces/leaderboardEntry"
import Leaderboard from "../../interfaces/leaderboard"
import { Reader } from "../../coder"

function parseLeaderboard(
  data: Buffer,
  bot: any
): Leaderboard {
  const reader: Reader = new Reader(data)

  reader.offset = 1

  const leaderboard: LeaderboardEntry[] = []

  while (true) {
    const playerId: number = reader.u16()
    if (playerId === 0) break // null terminated

    const score: number = reader.u32()
    const name: string = reader.string()

    const entry: LeaderboardEntry = {
      id: playerId,
      score,
      name,
    }
    leaderboard.push(entry)
  }

  const otherInfo: any = {} // never claimed to be good at ts

  otherInfo.yourId = reader.u16()

  if (otherInfo.yourId !== 0) {
    bot.alive = true
    otherInfo.score = reader.u32()
    otherInfo.yourRank = reader.u16()
    otherInfo.everyScoreCombined = reader.u32()
    otherInfo.scoreOnMap = reader.u32()
  } else {
    bot.alive = false
    otherInfo.yourScore = 0
    otherInfo.yourRank = 0
  }

  return {
    type: "leaderboard",
    data: {
      leaderboard,
      otherInfo,
    },
  }
}

export default parseLeaderboard
module.exports = parseLeaderboard
