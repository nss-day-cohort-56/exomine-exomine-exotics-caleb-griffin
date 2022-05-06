import { getGovernors } from "./database.js"

/* 
*** To Do ***

[x] import 'governors' array from 'database.js'

[x] make html dropdown list using data from 'governors' array

[x] export dropdown list to 'Exomine.js'

*/

const governors = getGovernors()

// makes and exports 'choose a governor' dropdown
export const Governors = () => {
    // opening tag
    let html = `<section class="governor-selection-section">
    <p>Choose governor function here</p>
    <select name="governors" id="governors">
        <option value="0" selected>Select a governor</option>`


        governors.forEach(
            (gov) => {
            // checks if governor is active
            if (gov.isActive) {
                // template for list option
                html += `<option value="${gov.id}">${gov.name}</option>`
            }
        }
    )
    // closing tag
    html += `</select></section>`
    return html
}
