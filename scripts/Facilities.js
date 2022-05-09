// import facility data
import { getFacilities, setFacility, getTransientState } from "./database.js"

//assign facility data to a variable
const facilities = getFacilities()

// create function to export to Exomine that will build html for facility dropdown box 
export const Facilities = () => {
    let transientState = getTransientState()
    let html = `<section class="facility-selection-section">
    <p>Choose a facility</p>
    <select id='facility' disabled>
    <option value='0'>Select a facility</option>`

    //use map array method to iterate through facilities, create dropdown option for each facility, and output to an array
    const facilityArray = facilities.map(
        (facility) => {
            // check to see if facility is active
            if (facility.isActive) {
                // check to see if current facility is what was selected on transient state - make that one "selected" for when html generates.
                if (facility.id === transientState.selectedFacility) {
                    return `<option value="${facility.id}" selected>${facility.name}</option>`
                } else {
                    return `<option value="${facility.id}">${facility.name}</option>`
                }
            }
        }
    )
    //use join method to combine all strings in facilityArray into one string
    html += facilityArray.join(" ")
    html += "</select></section>"

    return html
}

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "governors") {
            const facilitySelection = document.getElementById("facility")
            if (changeEvent.target.value > 0) {
                facilitySelection.disabled = false;
            } else {
                facilitySelection.disabled = true;
                facilitySelection.selectedIndex = 0;
            }
        }
    }
)

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facility") {
            setFacility(parseInt(changeEvent.target.value))
        }
    }
)