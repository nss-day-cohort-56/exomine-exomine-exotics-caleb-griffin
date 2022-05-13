import { getGovernors, getTransientState, setGovernor, setColony, resetTransientState } from "./database.js"

const governors = getGovernors()    // assign getter fuction to variable

// when governor is selected from dropdown...

document.addEventListener('change', (event) => {
    if (event.target.name === "governors") {
        
        const govId = parseInt(event.target.value)  // assign selected governor value to variable
        const gov = governors.find(gov => gov.id === govId) // find selected governor object
        
        // set governor and colony in the transient state

        if (govId === 0) {  // if governor is set to default...
            resetTransientState()
            setGovernor(govId)
            setColony(undefined)
        } else {    // or if specific governor is selected...
            setGovernor(govId)
            setColony(gov.colonyId)
        }
    }
})

// create HTML for Governors dropdown

export const Governors = () => {

    let transientState = getTransientState()    // assign getter function to variable

    /* begin building HTML string and assign it to variable
    This string contains: 
        opening section tag
        p tag for label
        opening select tag for dropdown list
        default dropdown option */

    let html = `<section class="governor-selection-section">
    <p>Choose a Governor</p>
    <select name="governors" id="governors">
        <option value="0" >Select a governor</option>`

    /* Use .map() to create new array of HTML strings.
    These strings contain the options that make up the governor dropdown. */
    
    const governorsArray = governors.map((gov) => {
        if (gov.isActive) { // check if governor is set to active
            if (transientState.selectedGovernor > 0 && gov.id === transientState.selectedGovernor) {    // only create THIS string if governor is selected...
                return `<option value="${gov.id}" selected="selected">${gov.name}</option>`
            } else {    // ...otherwise create this string
                return `<option value="${gov.id}" >${gov.name}</option>`
            }
        }
    })

    html += governorsArray.join("") // join all strings from array

    html += `</select></section>`   // close select and section tags
    return html
}