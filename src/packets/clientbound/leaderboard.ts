import ParsedClientboundPacket from "../../interfaces/parsedClientboundPacket"
import LeaderboardEntry from "../../interfaces/leaderboardEntry"
import { Reader } from "../../coder"

function parseLeaderboard(
  packetHeader: number,
  data: Buffer
): ParsedClientboundPacket {
  const reader: Reader = new Reader(data)

  reader.offset = 1

  const leaderboard: LeaderboardEntry[] = []

  while (true) {
    const playerId: number = reader.u16()
    if (playerId === 0) break // null terminated

    let score: number = 0
    if (packetHeader === 0xa5) score = reader.u16() // i really hate how this game's packets work
    else score = reader.u32()

    const name: string = reader.string() 

    const entry: LeaderboardEntry = {
      id: playerId,
      score,
      name,
    }
    leaderboard.push(entry)
  }

  return {
    type: "leaderboard",
    data: {
      leaderboard,
    },
  }
}

export default parseLeaderboard
module.exports = parseLeaderboard