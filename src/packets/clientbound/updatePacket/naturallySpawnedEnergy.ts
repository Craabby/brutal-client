import { Reader } from "../../../coder"
import Vector from "../../../vector"

class NaturallySpawnedEnergy {
  public position: Vector = new Vector(0, 0)
  public angle: number = 0
  public hue: number = 0
  public name: string = ""

  updateNetwork(packet: Reader, isCreation: boolean): void {
    packet.u16() // calvin wtf is this

    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10)
    this.angle = packet.f32()

    if (isCreation) {
      this.hue = packet.u16()
    }
  }

  deleteNetwork(packet: Reader): void {
    packet.u8()
  }
}

export default NaturallySpawnedEnergy
