import { Reader } from "../../../coder";
import Vector from "../../../vector";

class RedFlail {
  public position: Vector = new Vector(0, 0);

  updateNetwork(packet: Reader, isCreation: boolean): void {
    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10);
  }

  deleteNetwork(packet: Reader) {
    packet.u8();
  }
}

export default RedFlail;
