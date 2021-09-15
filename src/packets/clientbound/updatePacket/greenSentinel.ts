import { Reader } from "../../../coder"
import Vector from "../../../vector"

class GreenSentinel {
  public subtype: number = 0
  public angle: number = 0
  public positive: number = 0
  public hue: number = 0
  public impulseValue: number = 0
  public position: Vector = new Vector(0, 0)

  constructor(type: number) {
    this.subtype = type
  }

  updateNetwork(packet: Reader, isCreation: boolean): void {
    packet.u16() // again calvin?
    
    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10)
    this.angle = packet.f32()
    
    if (packet.u8()) this.impulseValue = 1

    if (isCreation) {
      this.positive = packet.u8()
      this.hue = this.positive ? 116 : 0
    }
  }

  deleteNetwork(packet: Reader): void {
    packet.u8()
  }
}

export default GreenSentinel