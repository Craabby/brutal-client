import { Writer } from "../../coder";

module.exports = (data: object): ArrayBuffer => {
  const writer = new Writer();
  writer.u8(0);
  return writer.packet;
};
