import { getColonyMineralJoins, getMinerals } from "./database.js";


export const CurrentColonyMinerals = (colony) => {
    const joins = getColonyMineralJoins()
    const minerals = getMinerals()
    let html = ""
    joins.forEach((join) => {
        if (join.colonyId === colony.id) {
            const mineral = minerals.find(m => m.id === join.mineralId)
            html += `<p>${join.tons} tons of ${mineral.name}</p>`
        }
    })
    return html
}
