import Vector from "../../../vector";
import { Reader } from "../../../coder";

class MapObject2 {
  public type: number = 0;
  public angle: number = 0;
  public shapeIndex: number = 0;
  public pulsing: boolean = false;
  public position: Vector = new Vector(0, 0);

  constructor(type: number) {
    this.type = type;
  }

  updateNetwork(packet: Reader, isCreation: boolean): void {
    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10);
    this.angle = packet.f32();
    this.shapeIndex = packet.u8();

    let c;
    let u;
    let coreRotation;
    if (this.type === 0) {
      packet.u8();
      c = packet.u8();
    } else if (this.type === 5) {
      let g1 = packet.u8();
      u = g1 & -9; // calvin youre wack
      if (this.angle & 8) this.pulsing = true;
      coreRotation = packet.f32();
    }
  }

  deleteNetwork() {}
}

export default MapObject2;
