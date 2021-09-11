import { Writer } from "../../coder"
import Vector from "../../vector"
import InputPacket from "../../interfaces/inputPacket";



module.exports = (data: InputPacket): ArrayBuffer => {
  const writer = new Writer()
  let flags = 0

  if (data.flags.playerIsMoving) flags |= 1

  writer.u8(5)
  writer.f64(data.mouse.dir)
  writer.u8(flags)
  return writer.packet
}
