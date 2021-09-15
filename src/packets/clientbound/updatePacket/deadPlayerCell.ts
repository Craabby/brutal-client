import { Reader } from "../../../coder";
import Vector from "../../../vector";

class DeadPlayerCell {
  public energy: number = 0;
  public angle: number = 0;
  public hue: number = 0;
  public type: number = 0;
  public position: Vector = new Vector(0, 0);
  public name: string = "";

  updateNetwork(packet: Reader, isCreation: boolean): void {
    this.energy = packet.u16();
    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10);
    this.angle = packet.f32();

    if (isCreation) {
      this.hue = packet.u16();
      this.type = packet.u8();
    }
  }

  deleteNetwork(packet: Reader) {
    packet.u8();
  }
}

export default DeadPlayerCell;
