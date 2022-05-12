import { getColonies, getColonyMineralJoins, getGovernors, getMinerals, getTransientState } from "./database.js";

export const Minerals = () => {
    // get minerals, joins, transientState, governers and colonies
    const minerals = getMinerals() // array
    const joins = getColonyMineralJoins() // array
    const transientState = getTransientState() // object
    const governors = getGovernors() // array
    const colonies = getColonies() // array

    // empty string
    let html = ''

    // check status of selectedGoverner property
    if (transientState.selectedGovernor === 0 || transientState.selectedGovernor === undefined) {
        html += '<h2>Colony Minerals</h2>'
    } else if (transientState.selectedGovernor > 0) {

        // find selected governor
        const gov = governors.find(gov => gov.id === transientState.selectedGovernor)
        // find governor's colony
        const col = colonies.find(col => col.id === gov.colonyId)
        // add colony name to html
        html += `<h2>${col.name} Minerals</h2>`
        
        // iterate joins
        const joinsArray = joins.map((join) => {
            // find joins for colony
            if (join.colonyId === col.id) {
                // find minerals for join
                const min = minerals.find(min => min.id === join.mineralId)
                // add amount and mineral name to html
                if (join.tons === 1) {
                    return `<p>${join.tons} ton of ${min.name}</p>`
                } else {
                    return `<p>${join.tons} tons of ${min.name}</p>`
                }
            }
        })

        html += joinsArray.join("")
        
    }
    return html
}