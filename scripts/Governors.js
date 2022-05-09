import { getColonies, getGovernors, setGovernor } from "./database.js"
// import { CurrentColonyMinerals } from "./Minerals.js"

// assign imported arrays to variables
const governors = getGovernors()
const colonies = getColonies()

// event listener for governor selection
document.addEventListener('change', (event) => {
    if (event.target.name === "governors") {
        // finds selected governor
        // const selectedGovernor = governors.find(gov => gov.id === parseInt(event.target.value))
        // finds colongy for selected governor
        // const selectedColony = colonies.find(col => col.id === selectedGovernor.colonyId)
        // updates HTML to show colony name 
        // document.querySelector('.colony-inv-container').innerHTML = `<h2>${selectedColony.name} Minerals</h2> ${CurrentColonyMinerals(selectedColony)}`
        const govId = parseInt(event.target.value)
        setGovernor(govId)
    }
})

// makes and exports 'choose a governor' dropdown
export const Governors = () => {
    // opening tag
    let html = `<section class="governor-selection-section">
    <p>Choose a Governor</p>
    <select name="governors" id="governors">
        <option value="0" >Select a governor</option>`


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
