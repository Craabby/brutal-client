import { Writer } from "../../coder";

module.exports = (data?: { width: number; height: number }): ArrayBuffer => {
  if (data == null) data = { width: 1000, height: 1000 };

  const writer = new Writer();
  writer.u8(1);
  // divide stuff by 10 since the dev is wack
  writer.u16(data.width / 10);
  writer.u16(data.height / 10);

  return writer.packet;
};
