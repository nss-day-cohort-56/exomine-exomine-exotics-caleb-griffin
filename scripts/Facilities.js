// import facility data
import { getFacilities, setFacility, getTransientState, createFacilityObject } from "./database.js"

//assign facility data to a variable
const facilities = getFacilities()

// create function to export to Exomine that will build html for facility dropdown box 
export const Facilities = () => {
    // get transient state
    let transientState = getTransientState()

    //create section for dropdown box
    let html = `<section class="facility-selection-section">
    <p>Choose a facility</p>`

    //invoke htmlStringBuilder function, add this to html string
    html += htmlStringBuilder(transientState)

    return html
}

const htmlStringBuilder = (transientStateObj) => {
    //create empty html string
    let html = ""
    // Check to see if governor has been selected (selectedGovernor > 0)
    if (transientStateObj.selectedGovernor > 0) {

        //create header and base option that are not disabled
        html += `<select id='facility'>
        <option value='0'>Select a facility</option>`

        //use map array method to iterate through facilities, create dropdown option for each facility, and output to an array
        const facilityArray = facilities.map(
            (facility) => {
                // check to see if facility is active
                if (facility.isActive) {
                    // check to see if current facility is what was selected on transient state - make that one "selected" for when html generates.
                    return optionHtmlBuilder(facility, transientStateObj)
                }
            }
        )
        //use join method to combine all strings in facilityArray into one string
        html += facilityArray.join(" ")

        // If governor is NOT selected or user has de-selected a governor...
    } else {

        //create header and base option that ARE disabled.
        html += `<select id='facility' disabled>
        <option value='0'>Select a facility</option>`

    }

    // close select and section tags
    html += "</select></section>"

    return html
}

// This function creates facility dropdown options, gets called within htmlStringBuilder function
const optionHtmlBuilder = (facility, transientStateObj) => {
    if (facility.id === transientStateObj.selectedFacility) {
        return `<option value="${facility.id}" selected>${facility.name}</option>`
    } else {
        return `<option value="${facility.id}">${facility.name}</option>`
    }
}


/*

This event listener watches for when a facility is selected. When a facility is selected, it checks within the transient state to see if an order object exists for that 
facility within the orderBuilder array. If that object does not already exist, it creates an object within transientState.orderBuilder that has a selectedFacility ID matching
the facility that was selected. Then, it sets selectedFacility in the transient state object (not within the order builder object) to match the ID of the selectedFacility. If the object
DOES already exist, it just updates the selectedFacility id in the transient state object.

*/

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facility") {
            // check to see if object within orderBuilder exists w/ selectedFacility value matching value of event listener target.  
            const facilityId = parseInt(changeEvent.target.value)
            let foundObject = findTransientStateObj(facilityId)
            
            if (foundObject === undefined) {
                createFacilityObject(facilityId)
                foundObject = findTransientStateObj(facilityId)
            }

            setFacility(parseInt(changeEvent.target.value))
        }
    }
)

//Finder function to grab the order builder object with a facility ID that matches the facility ID that was just selected by the user. Function called within event listener.
const findTransientStateObj = (facilityId) => {
    const transientState = getTransientState()
    return transientState.orderBuilder.find( obj => obj.selectedFacility === facilityId )
}