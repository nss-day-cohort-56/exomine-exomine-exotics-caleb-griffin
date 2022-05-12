// import all data necessary
import { getMineralFacilityJoins, getFacilities, getMinerals, getTransientState, setFacilityMineral, setMineral } from "./database.js"

// assign data to variables

let mineralFacilityJoins = getMineralFacilityJoins()
const facilities = getFacilities()
const minerals = getMinerals()

export const FacilityInventory = () => {
    mineralFacilityJoins = getMineralFacilityJoins()
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
        html += `<h2>${foundFacility} Inventory</h2>`
        //start unordered list of radio buttons
        html += "<ul class='inventory-button-list'>"
        //iterate through all mineral facility joins. 
        const facilityInventoryArray = mineralFacilityJoins.map(
            (facilityMineral) => {
                //Find which mineralFacilityJoin objects have facilityId's equal to the facility Id on the transient state.
                if (facilityMineral.facilityId === transientState.selectedFacility && facilityMineral.tons > 0) {
                    //if IDs match, feed data into radio button builder function
                    return radioButtonBuilder(facilityMineral, transientState)
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
   const foundMineral = minerals.find( mineral => facilityMineralObj.mineralId === mineral.id)
   return foundMineral.name
}

// This function finds the name of the facility in a facilityMineral join object - called within larger FacilityInventory() function to correctly populate <h2> section title
const findFacility = (transientStateObj) => {
   const myFacility = facilities.find( facility => transientStateObj.selectedFacility === facility.id)
   return myFacility.name
}

//this function creates a radio button for each type of mineral within selected facility
const radioButtonBuilder = (facilityMineral, transientStateObj) => {
    let foundMineral = findMineral(facilityMineral)
    if (facilityMineral.id === transientStateObj.selectedFacilityMineral) {
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

    } else { if (facilityMineral.tons === 1) {
        return `<li>
            <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} ton of ${foundMineral}
        </li>`
    }
    else {
        return `<li>
        <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} tons of ${foundMineral}
    </li>`
    } }
}


document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name === "inventory") {
            const foundMineralFacilityJoin = mineralFacilityJoins.find(mineralFacility => mineralFacility.id === parseInt(changeEvent.target.value))
            setMineral(foundMineralFacilityJoin.mineralId)
            setFacilityMineral(foundMineralFacilityJoin.id)
        }
    }
)

export const showCart = () => {

    let html = `<ul class="cart-section-list">
                 <li class="list-item">`


    let transientState = getTransientState()

    if (transientState.selectedFacilityMineral === 0 || transientState.selectedFacilityMineral === undefined) {
        html += `</li> </ul>`
    }
    else {
        
        let foundFacility = findFacility(transientState)
        let selectedMineral = minerals.find(mineral => mineral.id === transientState.selectedMineral)

        //console.log(`1 ton of ${selectedMineral.name} from ${foundFacility} `)
        console.log(transientState)

        html += `1 ton of ${selectedMineral.name} from ${foundFacility} </li> </ul>`
    }
    return html

}
