import { getColonies, getGovernors, getTransientState, setGovernor, setFacility, setFacilityMineral, setColony } from "./database.js"
// import { CurrentColonyMinerals } from "./Minerals.js"

// assign imported arrays to variables
const governors = getGovernors()
const colonies = getColonies()

// event listener for governor selection
document.addEventListener('change', (event) => {
    if (event.target.name === "governors") {
        // find selected governor id
        const govId = parseInt(event.target.value)
        const gov = governors.find(gov => gov.id === govId)
        // check to see if govId is 0 - this means governor has been deselected.
        if (govId === 0) {
            // reset selectedfacility to 0
            setFacility(0)
            setFacilityMineral(0)
            setGovernor(govId)
            setColony(undefined)
        } else {
            // update transient state
            setGovernor(govId)
            setColony(gov.colonyId)
        }
    }
})

// makes and exports 'choose a governor' dropdown
export const Governors = () => {
    
    // get transient state
    let transientState = getTransientState()

    // opening tag
    let html = `<section class="governor-selection-section">
    <p>Choose a Governor</p>
    <select name="governors" id="governors">
        <option value="0" >Select a governor</option>`


        governors.forEach(
            (gov) => {
            // checks if governor is active
            if (gov.isActive) {
                if (transientState.selectedGovernor > 0 && gov.id === transientState.selectedGovernor) {
                    html += `<option value="${gov.id}" selected="selected">${gov.name}</option>`
                } else {
                    html += `<option value="${gov.id}" >${gov.name}</option>`
                }
            } 
        }
    )
    // closing tag
    html += `</select></section>`
    return html
}
