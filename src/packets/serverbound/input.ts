import { Writer } from "../../coder"
import Vector from "../../vector"

type inputPacket = {
  mouse: Vector
  flags: {
    playerIsMoving: boolean
  }
}

module.exports = (data: inputPacket): ArrayBuffer => {
  const writer = new Writer()
  let flags = 0

  if (data.flags.playerIsMoving) flags |= 1

  writer.u8(5)
  writer.f64(data.mouse.dir)
  writer.u8(flags)
  return writer.packet
}
