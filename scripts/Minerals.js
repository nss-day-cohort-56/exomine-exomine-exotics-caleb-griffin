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
        joins.forEach((join) => {
            // find joins for colony
            if (join.colonyId === col.id) {
                // find minerals for join
                const min = minerals.find(min => min.id === join.mineralId)
                // add amount and mineral name to html
                html += `<p>${join.tons} tons of ${min.name}</p>`
            }
        })
    }
    return html
}




/*
    Goal: Swap the value of the following two variables. You cannot define 
          any more variables. Use only these two.
*/

let firstNumber = 42
let secondNumber = 11

