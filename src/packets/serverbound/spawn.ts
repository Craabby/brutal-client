import { Writer } from "../../coder"

module.exports = (data?: string): ArrayBuffer => {
  if(data == null) data = ""
  
  const writer = new Writer()
  writer.u8(3)
  writer.string(data)
  return writer.packet
}
