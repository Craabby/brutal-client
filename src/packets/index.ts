import Vector from "../vector"
import ParsedClientboundPacket from "../interfaces/parsedClientboundPacket"

const serverbound: any = {
  ping: require("./serverbound/ping"),
  init: require("./serverbound/init"),
  spawn: require("./serverbound/spawn"),
  input: require("./serverbound/input"),
  // resizeWindow: 7,
  // click: 8,
}

const clientbound: any = {
  leaderboard: require("./clientbound/leaderboard"),
  update: require("./clientbound/update"),
  unknown: require("./clientbound/unknown"),
}

const clientboundOpcodes: any = {
  [0xb5]: "leaderboard",
  [0xb4]: "update",
  [0xa0]: "unknown",
  [0xa1]: "unknown",
  [0xa4]: "unknown",
  [0xa6]: "unknown",
  [0x01]: "unknown", // only in eu servers??
  [0x00]: "unknown",
}

export function encode(type: string, data: object, bot: any): ArrayBuffer {
  if (!serverbound.hasOwnProperty(type)) {
    throw new Error(`Unsuppored packet '${type}'`)
  }

  return serverbound[type](data, bot)
}

export function decode(data: Buffer, bot: any): ParsedClientboundPacket {
  const opcode: number = new Uint8Array(data)[0]
  const type = clientboundOpcodes[opcode]

  return clientbound[type](data, bot)
}
