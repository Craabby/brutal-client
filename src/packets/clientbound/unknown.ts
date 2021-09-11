import ParsedClientboundPacket from "../../interfaces/parsedClientboundPacket"

function returnUnkownPacket(opcode: number, data: Buffer): ParsedClientboundPacket {
  return { type: "unknown", data }
}

export default returnUnkownPacket
module.exports = returnUnkownPacket