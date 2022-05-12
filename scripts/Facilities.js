// import facility data
import { getFacilities, setFacility, getTransientState, setFacilityMineral, setMineral } from "./database.js"

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

const optionHtmlBuilder = (facility, transientStateObj) => {
    if (facility.id === transientStateObj.selectedFacility) {
        return `<option value="${facility.id}" selected>${facility.name}</option>`
    } else {
        return `<option value="${facility.id}">${facility.name}</option>`
    }
}

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facility") {
            const facilityId = parseInt(changeEvent.target.value)
            const facilityName = findFacilityName(facilityId)
            createFacilityObject(facilityName, facilityId)
            setFacility(parseInt(changeEvent.target.value))
            setFacilityMineral(0)
            setMineral(0)
        }
    }
)

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


const findFacilityName = (facilityId) => {
    const facility = facilities.find(facility => facility.id === facilityId)
    return facility.name
}

const createFacilityObject = (foundFacilityName, facilityId) => {
    const transientState = getTransientState()
    const newObject = {
        selectedFacility: facilityId,
        selectedFacilityMineral: 0,
        selectedMineral: 0
    }
    transientState.orderBuilder.push(newObject)
}