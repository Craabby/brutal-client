"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coder_1 = require("../../coder");
const deadPlayerCell_1 = require("./updatePacket/deadPlayerCell");
const greenSentinel_1 = require("./updatePacket/greenSentinel");
const mapObject1_1 = require("./updatePacket/mapObject1");
const mapObject2_1 = require("./updatePacket/mapObject2");
const naturallySpawnedEnergy_1 = require("./updatePacket/naturallySpawnedEnergy");
const otherPlayer_1 = require("./updatePacket/otherPlayer");
const redFlail_1 = require("./updatePacket/redFlail");
function parseUpdatePacket(data, bot) {
    bot.lag = Date.now() - bot._lastUpdatePacket;
    bot._lastUpdatePacket = Date.now();
    const packet = new coder_1.Reader(data);
    while (true) {
        const currentId = packet.u16();
        if (currentId === 0) {
            if (packet.offset !== Buffer.length) {
                const kingId = packet.u16();
                if (kingId !== 0) {
                    const kingX = packet.u16();
                    const kingY = packet.u16();
                }
            }
            break;
        }
        const type = packet.u8();
        if (type === 0) {
            const entity = bot.entites[currentId];
            if (entity)
                entity.updateNetwork(packet, false);
            else {
                throw new Error(`Tried to update a nonexistant entity. Id: ${currentId}`);
            }
        }
        else if (type === 1) {
            const entityType = packet.u8();
            const entitySubtype = packet.u8();
            const entityName = packet.string();
            let entity = null;
            if (entityType === 5)
                entity = new otherPlayer_1.default();
            else if (entityType === 4) {
                if (entitySubtype === 0)
                    entity = new naturallySpawnedEnergy_1.default();
                else if (entitySubtype === 1)
                    entity = new deadPlayerCell_1.default();
                else if (entitySubtype === 4)
                    entity = new redFlail_1.default();
                else if (entitySubtype === 2 || entitySubtype === 3) {
                    entity = new greenSentinel_1.default(entitySubtype);
                }
            }
            else if (entityType === 1) {
                if (entitySubtype === 3)
                    entity = new mapObject1_1.default();
                else
                    entity = new mapObject2_1.default(entitySubtype);
            }
            if (!entity)
                throw new Error(`Failed to create entityType ${entityType} subtype ${entitySubtype}`);
            entity.name = entityName;
            entity.id = currentId;
            entity.updateNetwork(packet, true);
            bot.entities[currentId] = entity;
            console.log("creation", entity);
        }
        else if (type === 2) {
            let e = packet.u16();
            let g = packet.u8();
            const entity = bot.entities[currentId];
            if (!entity) {
                throw new Error(`tried to delete entity that doesnt exist ${currentId}`);
            }
        }
    }
    return { type: "update", data: bot.entities };
}
exports.default = parseUpdatePacket;
module.exports = parseUpdatePacket;
//# sourceMappingURL=update.js.map