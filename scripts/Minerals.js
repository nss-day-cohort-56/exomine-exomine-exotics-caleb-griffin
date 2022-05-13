import { getColonies, getColonyMineralJoins, getGovernors, getMinerals, getTransientState } from "./database.js";

// create HTML for Minerals section

export const Minerals = () => {
    
    // assign getter functions to variables

    const minerals = getMinerals() 
    const joins = getColonyMineralJoins() 
    const transientState = getTransientState() 
    const governors = getGovernors() 
    const colonies = getColonies() 

    let html = ''   // assign empty string to variable

    // if governor is not selected...

    if (transientState.selectedGovernor === 0 || transientState.selectedGovernor === undefined) {  
        html += '<h2>Colony Minerals</h2>'  // ... add this string to HTML

    // otherwise...

    } else if (transientState.selectedGovernor > 0) { 

        const gov = governors.find(gov => gov.id === transientState.selectedGovernor) // assign selected governor to variable
        const col = colonies.find(col => col.id === gov.colonyId) // assign selected colony to variable
        
        html += `<h2>${col.name} Minerals</h2>` // add this string to HTML 
        
        /* Use .map() to create new array of strings.
        These strings contain the HTML that displays the minerals for each colony*/
        
        const joinsArray = joins.map((join) => {
            if (join.colonyId === col.id) { // if the selected colony has that mineral...
                const min = minerals.find(min => min.id === join.mineralId) // assign mineral to a variable
                
                // check quantity of mineral and return string...
                
                if (join.tons === 1) {
                    return `<p>${join.tons} ton of ${min.name}</p>` // ...if the quantity is 1
                } else {
                    return `<p>${join.tons} tons of ${min.name}</p>` // ...if the quantity is > 1
                }
            }
        })

        html += joinsArray.join("") // join all strings in array
        
    }
    return html
}