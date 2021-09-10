import Vector from "../vector"

const serverbound: any = {
  ping: require("./serverbound/ping"),
  init: require("./serverbound/init"),
  spawn: require("./serverbound/spawn"),
  input: require("./serverbound/input"),
  // resizeWindow: 7,
  // click: 8,
}

export function encode(type: string, data: object): ArrayBuffer {
  if (!serverbound.hasOwnProperty(type)) {
    throw new Error(`Unsuppored packet '${type}'`)
  }

  return serverbound[type](data)
}
