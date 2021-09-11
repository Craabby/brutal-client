import Vector from "../vector"

interface InputPacket {
  mouse: Vector
  flags: {
    playerIsMoving: boolean
  }
}

export default InputPacket
