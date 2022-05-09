import { getColonyMineralJoins, getMinerals } from "./database.js";

// export function to create current minerals html
export const CurrentColonyMinerals = (colony) => { // takes selectedColony from Governors.js eventListener as parameter
    // assign imported data to variables
    const joins = getColonyMineralJoins()
    const minerals = getMinerals()
    // declare empty string
    let html = ""
    // iterate all colony-mineral joins
    joins.forEach((join) => {
        if (join.colonyId === colony.id) {
            // find mineral that matches join
            const mineral = minerals.find(m => m.id === join.mineralId)
            html += `<p>${join.tons} tons of ${mineral.name}</p>`
        }
    })
    return html
}
