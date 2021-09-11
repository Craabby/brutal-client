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
  unknown: require("./clientbound/unknown"),
}

const clientboundOpcodes: any = {
  [0x00]: "unknown",
  [0xa0]: "unknown",
  [0xa1]: "unknown",
  [0xa4]: "unknown",
  [0xa6]: "unknown",
  [0xb4]: "unknown",
  [0xa5]: "leaderboard", // scores are a u16 instead of a u32
  [0xb5]: "leaderboard", // all scores are a u32
}


export function encode(type: string, data: object): ArrayBuffer {
  if (!serverbound.hasOwnProperty(type)) {
    throw new Error(`Unsuppored packet '${type}'`)
  }

  return serverbound[type](data)
}

export function decode(data: Buffer): ParsedClientboundPacket {
  const opcode: number = new Uint8Array(data)[0]
  const type = clientboundOpcodes[opcode];

  return clientbound[type](opcode, data);
}