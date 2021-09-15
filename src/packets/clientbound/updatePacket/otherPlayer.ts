import Vector from "../../../vector"
import { Reader } from "../../../coder"

class Player {
  public chainSegments: Vector[] = []
  public energy: number = 0
  public flailAngle: number = 0
  public flailRadius: number = 0
  public angle: number = 0
  public hue: number = 0
  public position: Vector = new Vector(0, 0)
  public flialPosition: Vector = new Vector(0, 0)
  public attached: boolean = false
  public attracting: boolean = false
  public invulnerable: boolean = false
  public shock: boolean = false
  public decay: boolean = false
  public still: boolean = false
  public inside: boolean = false
  public charging: boolean = false
  public redFlail: boolean = false
  public redFlailDepleted: boolean = false
  public name: string = ""

  public updateNetwork(packet: Reader, isCreation: boolean): void {
    this.energy = packet.u8()
    this.position = new Vector(packet.f32(), -packet.f32()).multiply(10)
    this.angle = packet.f32()

    this.updateChainFlail(packet, isCreation)
    this.updateNetworkFlail(packet, isCreation)

    if (isCreation) {
      this.hue = packet.u16()
    }
  }

  private updateChainFlail(packet: Reader, isCreation: boolean): void {
    const chainSegmentsLength = packet.u8()
    for (let i = 0; i < chainSegmentsLength; i++) {
      if (isCreation) {
        this.chainSegments.push(new Vector(0, 0))
      }

      this.chainSegments[i] = new Vector(packet.f32(), -packet.f32()).multiply(
        10
      )
    }
  }

  private updateNetworkFlail(packet: Reader, isCreation: boolean): void {
    this.flialPosition = new Vector(packet.f32(), -packet.f32()).multiply(10)
    this.flailAngle = -packet.f32()
    this.flailRadius = packet.u32() * 10

    const flags = packet.u16()

    this.attached = !!(flags & 1)
    this.attracting = !!(flags & 2)
    this.invulnerable = !!(flags & 4)
    this.shock = !!(flags & 8)
    this.decay = !!(flags & 16)
    this.still = !!(flags & 32)
    this.inside = !!(flags & 64)
    this.charging = !!(flags & 128)
    this.redFlail = !!(flags & 256)
    this.redFlailDepleted = !!(flags & 512)

    if (this.redFlailDepleted) {
      packet.u8() // i dont think anyone really cares how much energy the red flial has left
    }
  }

  deleteNetwork() {} // you do literally nothing aside from `delete <id>` for the deletion packets lol
}

export default Player
