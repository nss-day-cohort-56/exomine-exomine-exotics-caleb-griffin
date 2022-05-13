// import all data necessary
import { getMineralFacilityJoins, getFacilities, getMinerals, getTransientState, setFacilityMineral, setMineral } from "./database.js"

// assign data to variables
let mineralFacilityJoins = getMineralFacilityJoins()
const facilities = getFacilities()
const minerals = getMinerals()



// Function that exports to exomine, responsible for providing all of the html for the mineral selection section.
export const FacilityInventory = () => {

    // get mineralFacilityJoin data
    mineralFacilityJoins = getMineralFacilityJoins()

    // get transient state whenever function is called
    let transientState = getTransientState()

    // set up empty html string
    let html = ""

    // check to see if facility has been selected OR if selected.Facility = 0
    if (transientState.selectedFacility === undefined || transientState.selectedFacility === 0) {

        // If thats the case, print out generic header
        html += "<h2>Facility inventory</h2>"

        // if a facility HAS been selected, do the following:
    } else {

        // find out what facility was selected
        let foundFacility = findFacility(transientState)

        //create html title based on what facility was selected
        html += `<h2>${foundFacility} Inventory</h2>`

        //start unordered list of radio buttons
        html += "<ul class='inventory-button-list'>"

        // get the orderBuilder object for the facility that was most recently selected.
        const currentFacility = transientState.selectedFacility
        const currentFacilityObject = transientState.orderBuilder.find(
            obj => obj.selectedFacility === currentFacility)

        // iterate through mineralFacilityJoins data
        const facilityInventoryArray = mineralFacilityJoins.map(
            (facilityMineral) => {
                //Find which mineralFacilityJoin objects have facilityId's equal to the facility Id on the transient state.
                if (facilityMineral.facilityId === transientState.selectedFacility && facilityMineral.tons > 0) {
                    //if IDs match, feed data into radio button builder function
                    return radioButtonBuilder(facilityMineral, currentFacilityObject)
                }
            }
        )

        //join all radio button strings together
        html += facilityInventoryArray.join(" ")

        //close list
        html += '</ul>'
    }
    return html
}



// This function finds the name of the mineral in a facilityMineral join object - called within radio button builder function
const findMineral = (facilityMineralObj) => {
    const foundMineral = minerals.find(mineral => facilityMineralObj.mineralId === mineral.id)
    return foundMineral.name
}



// This function finds the name of the facility in a facilityMineral join object - called within larger FacilityInventory() function to correctly populate <h2> section title
const findFacility = (transientStateObj) => {
    const myFacility = facilities.find(facility => transientStateObj.selectedFacility === facility.id)
    return myFacility.name
}



//this function creates a radio button for each type of mineral within selected facility
const radioButtonBuilder = (facilityMineral, currentFacilityObj) => {

    // find mineral object 
    let foundMineral = findMineral(facilityMineral)

    // When printing radio buttons, check to see if that radio button was selected prior to html re-rendering. If so, mark as checked.
    if (facilityMineral.id === currentFacilityObj.selectedFacilityMineral) {

        // This chunk checks to see if tons is === 1 for each mineral option - if so, make sure radio button reads (1 ton, not 1 tons)
        if (facilityMineral.tons === 1) {
            return `<li>
                <input type="radio" name="inventory" value="${facilityMineral.id}" checked/>${facilityMineral.tons} ton of ${foundMineral}
            </li>`
        }
        else {
            return `<li>
            <input type="radio" name="inventory" value="${facilityMineral.id}" checked/>${facilityMineral.tons} tons of ${foundMineral}
        </li>`
        }

        // If radio button was NOT selected prior to html re-rendering, don't mark as checked.
    } else {
        if (facilityMineral.tons === 1) {
            return `<li>
            <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} ton of ${foundMineral}
        </li>`
        } else {
            return `<li>
        <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} tons of ${foundMineral}
        </li>`
        }
    }
}



/*

Event listner looks to see if a mineral radio button is selected. If so, find the facility-mineral object in facilityMineralJoins. Add the facilityMineral ID and the corresponding
mineral Id to the object for the selected facility within transientState.orderBuilder

*/
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name === "inventory") {
            // find the facilityMineralJoin object that matches the value of the radio button that was selected
            const foundMineralFacilityJoin = mineralFacilityJoins.find(mineralFacility => mineralFacility.id === parseInt(changeEvent.target.value))
            setMineral(foundMineralFacilityJoin.mineralId)
            setFacilityMineral(foundMineralFacilityJoin.id)


        }
    }
)




//This function is responsible for populating the html in the cart section.
export const ShowCart = () => {

    //create starter html string.
    let html = `
    <ul class="cart-section-list">
    `

    //get updated transient state 
    let transientState = getTransientState()

    // check to see if any facilities have been selected yet - aka, see if any objects are within transientState.order builder
    if (transientState.orderBuilder.length === 0) {

        // if order builder is empty, don't add any radio buttons to html string.
        html += ` </ul>`
    }

    // if transientState.orderBuilder is NOT empty...
    else {

        // iterate through order builder objects
        let htmlArray = transientState.orderBuilder.map((selectedObject) => {

            //check to see if mineral was selected for each orderBuilder object. AKA - if selectedMineral and selectedFacilityMineral are > 0
            if (selectedObject.selectedMineral > 0 && selectedObject.selectedFacilityMineral > 0) {

                //find facility name
                let foundFacility = findFacility(selectedObject)

                //find mineral name
                let selectedMineral = minerals.find(mineral => mineral.id === selectedObject.selectedMineral)

                //return string
                return `<li class="list-item"> 1 ton of ${selectedMineral.name} from ${foundFacility} </li>`
            }
        })

        //combine html strings in htmlArray and close <ul>
        html += htmlArray.join(" ")
        html += `</ul>`
    }
    return html

}