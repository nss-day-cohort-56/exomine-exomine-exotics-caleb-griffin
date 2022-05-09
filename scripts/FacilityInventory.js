// import all data necessary
import { getMineralFacilityJoins, getFacilities, getMinerals } from "./database.js"

// assign data to variables

const mineralFacilityJoins = getMineralFacilityJoins()
const facilities = getFacilities()
const minerals = getMinerals()

export const FacilityInventory = () => {
    let html = "<h2>ALL inventory</h2>"
    html += "<ul class='inventory-button-list'>"
    const facilityInventoryArray = mineralFacilityJoins.map(
        (facilityMineral) => {
            return radioButtonBuilder(facilityMineral)
        }
    )
    html += facilityInventoryArray.join(" ")
    html += '</ul>'

    return html
}

const findMineral = (facilityMineralObj) => {
    for (const mineral of minerals) {
        if (facilityMineralObj.mineralId === mineral.id) {
            return mineral.name
        }
    }
}

const findFacility = (facilityMineralObj) => {
    for (const facility of facilities) {
        if (facilityMineralObj.facilityId === facility.id) {
            return facility.name
        }
    }
}

const radioButtonBuilder = (facilityMineral) => {
    let foundMineral = findMineral(facilityMineral)
    let foundFacility = findFacility(facilityMineral)
    
    return `<li>
        <input type="radio" name="inventory" value="${facilityMineral.id}" />${facilityMineral.tons} tons of ${foundMineral} at ${foundFacility}
    </li>`
}
