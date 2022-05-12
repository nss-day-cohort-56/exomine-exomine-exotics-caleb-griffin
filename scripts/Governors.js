import { getGovernors, getTransientState, setGovernor, setFacility, setFacilityMineral, setColony, setMineral } from "./database.js"
// import { CurrentColonyMinerals } from "./Minerals.js"

// assign imported arrays to variables
const governors = getGovernors()

// event listener for governor selection
document.addEventListener('change', (event) => {
    if (event.target.name === "governors") {
        // find selected governor id
        const govId = parseInt(event.target.value)
        const gov = governors.find(gov => gov.id === govId)
        // check to see if govId is 0 - this means governor has been deselected.
        if (govId === 0) {
            // reset selectedfacility, selectedFacilityMineral, and selected mineral to 0
            governorReset()
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


    const governorsArray = governors.map((gov) => {
        // checks if governor is active
        if (gov.isActive) {
            if (transientState.selectedGovernor > 0 && gov.id === transientState.selectedGovernor) {
                return `<option value="${gov.id}" selected="selected">${gov.name}</option>`
            } else {
                return `<option value="${gov.id}" >${gov.name}</option>`
            }
        }
    })

    html += governorsArray.join("")

    // closing tag
    html += `</select></section>`
    return html
}

// get the transient state and set order builder objects to zero
const governorReset = () => {
    const transientState = getTransientState()
    transientState.orderBuilder.forEach((obj) => {
        setFacility(obj,0)
        setFacilityMineral(0)
        setMineral(0)
    })
}

