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
    let html = `<select name="governors" id="governors">
        <option value="0" selected>Choose a Governor...</option>`

    // template for list option
    governors.forEach(gov => html += `<option value="${gov.id}">${gov.name}</option>`)

    // closing tag
    html += `</select>`

    return html
}
