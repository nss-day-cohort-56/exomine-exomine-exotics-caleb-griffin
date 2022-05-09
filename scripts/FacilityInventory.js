// import all data necessary
import { getMineralFacilityJoins, getFacilities, getMinerals, getTransientState } from "./database.js"

// assign data to variables

const mineralFacilityJoins = getMineralFacilityJoins()
const facilities = getFacilities()
const minerals = getMinerals()

export const FacilityInventory = () => {
    // get transient state whenever function is called
    let transientState = getTransientState()

    // set up empty html string
    let html = ""

    // check to see if facility has been selected OR if selected.Facility = 0
    if (transientState.selectedFacility === undefined || transientState.selectedFacility === 0) {
        // If thats the case, print out generic header
        html += "<h2>Facility inventory</h2>"
    
    // if a facility HAS been selected, do the following
    } else {

        // find out what facility was selected
        let foundFacility = findFacility(transientState)
        //create html title based on what facility was selected
        html += `<h2>${foundFacility} Inventory`
        //start unordered list of radio buttons
        html += "<ul class='inventory-button-list'>"
        //iterate through all mineral facility joins. 
        const facilityInventoryArray = mineralFacilityJoins.map(
            (facilityMineral) => {
                //Find which mineralFacilityJoin objects have facilityId's equal to the facility Id on the transient state.
                if (facilityMineral.facilityId === transientState.selectedFacility) {
                    //if IDs match, feed data into radio button builder function
                    return radioButtonBuilder(facilityMineral)
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

const findMineral = (facilityMineralObj) => {
    for (const mineral of minerals) {
        if (facilityMineralObj.mineralId === mineral.id) {
            return mineral.name
        }
    }
}

const findFacility = (transientStateObj) => {
    for (const facility of facilities) {
        if (transientStateObj.selectedFacility === facility.id) {
            return facility.name
        }
    }
}

const radioButtonBuilder = (facilityMineral) => {
    let foundMineral = findMineral(facilityMineral)
    return `<li>
        <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} tons of ${foundMineral}
    </li>`
}


