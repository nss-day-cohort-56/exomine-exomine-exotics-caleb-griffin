// import facility data
import { getFacilities } from "./database.js"

//assign facility data to a variable
const facilities = getFacilities()

// create function to export to Exomine that will build html for facility dropdown box 
export const Facilities = () => {
    let html = `<section class="facility-selection-section">
    <p>Choose a facility</p>
    <select id='facility'>
    <option value='0'>Select a facility</option>`

    //use map array method to iterate through facilities, create dropdown option for each facility, and output to an array
    const facilityArray = facilities.map(
        (facility) => {
            if (facility.isActive) {
                return `<option value="${facility.id}">${facility.name}</option>`
            }
        }
    )
    //use join method to combine all strings in facilityArray into one string
    html += facilityArray.join(" ")
    html += "</select></section>"

    return html
}

