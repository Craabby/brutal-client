import ParsedClientboundPacket from "../../interfaces/parsedClientboundPacket"
import { Reader } from "../../coder"
import DeadPlayerCell from "./updatePacket/deadPlayerCell"
import GreenSentinel from "./updatePacket/greenSentinel"
import MapObject1 from "./updatePacket/mapObject1"
import MapObject2 from "./updatePacket/mapObject2"
import NaturallySpawnedEnergy from "./updatePacket/naturallySpawnedEnergy"
import Player from "./updatePacket/otherPlayer"
import RedFlail from "./updatePacket/redFlail"

function parseUpdatePacket(data: Buffer, bot: any): ParsedClientboundPacket {
  bot.lag = Date.now() - bot._lastUpdatePacket
  bot._lastUpdatePacket = Date.now()
  const packet: Reader = new Reader(data)

  packet.offset = 1

  while (true) {
    const currentId = packet.u16()

    if (currentId === 0) {
      if (packet.offset !== data.byteLength) {
        const kingId = packet.u16()

        if (kingId !== 0) {
          const kingX = packet.f32()
          const kingY = packet.f32()
        }
      }

      break
    }

    const type = packet.u8()

    if (type === 0) {
      const entity = bot.entities[currentId]
      if (entity) entity.updateNetwork(packet, false)
      else {
        throw new Error(
          `Tried to update a nonexistant entity. Id: ${currentId} at ${packet.offset}`
        )
      }
    } else if (type === 1) {
      const entityType = packet.u8()
      const entitySubtype = packet.u8()
      const entityName = packet.string()

      let entity: null | any = null

      if (entityType === 5) entity = new Player()
      else if (entityType === 4) {
        if (entitySubtype === 0) entity = new NaturallySpawnedEnergy()
        else if (entitySubtype === 1) entity = new DeadPlayerCell()
        else if (entitySubtype === 4) entity = new RedFlail()
        else if (entitySubtype === 2 || entitySubtype === 3) {
          entity = new GreenSentinel(entitySubtype)
        }
      } else if (entityType === 1) {
        if (entitySubtype === 3) entity = new MapObject1()
        else entity = new MapObject2(entitySubtype)
      }

      if (!entity)
        throw new Error(
          `Failed to create entityType ${entityType} subtype ${entitySubtype}`
        )

      entity.name = entityName
      entity.id = currentId

      entity.updateNetwork(packet, true)
      bot.entities[currentId] = entity

    } else if (type === 2) {
      let e = packet.u16()
      let g = packet.u8()

      const entity: undefined | any = bot.entities[currentId]

      if (!entity) {
        throw new Error(`tried to delete entity that doesnt exist ${currentId}`)
      }

      entity.killedById = e
      entity.killReason = g

      entity.deleteNetwork(packet)

      delete bot.entities[currentId]
    }
  }

  return { type: "update", data: bot.entities }
}

export default parseUpdatePacket
module.exports = parseUpdatePacket
