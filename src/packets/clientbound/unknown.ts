import ParsedClientboundPacket from "../../interfaces/parsedClientboundPacket"

function returnUnkownPacket(data: Buffer): ParsedClientboundPacket {
  return { type: "unknown", data }
}

export default returnUnkownPacket
module.exports = returnUnkownPacket