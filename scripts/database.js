const database = {
    governors: [
        {
            id: 1,
            name: 'Patricia Purdy',
            colonyId: 2,
            isActive: true
        },
        {
            id: 2,
            name: 'Katrina Bahringer',
            colonyId: 3,
            isActive: true
        },
        {
            id: 3,
            name: 'Lala Wolff',
            colonyId: 1,
            isActive: true
        },
        {
            id: 4,
            name: 'Damon Hartmann',
            colonyId: 2,
            isActive: true
        },
        {
            id: 5,
            name: 'Jake Sully',
            colonyId: 1,
            isActive: false
        }
    ],
    colonies: [
        {
            id: 1,
            name: 'Earth',
        },
        {
            id: 2,
            name: 'Mars',
        },
        {
            id: 3,
            name: 'Europa',
        },
    ],
    minerals: [
        {
            id: 1,
            name: 'Iron'
        },
        {
            id: 2,
            name: 'Chromium'
        },
        {
            id: 3,
            name: 'Molybdenum'
        },
        {
            id: 4,
            name: 'Sodium'
        },
    ],
    facilities: [
        {
            id: 1,
            name: 'Ganymede',
            isActive: true
        },
        {
            id: 2,
            name: 'Io',
            isActive: true
        },
        {
            id: 3,
            name: 'Titan',
            isActive: true
        },
        {
            id: 4,
            name: 'Pandora',
            isActive: false
        }
    ],
    colonyMineralJoins: [
        {
            id: 1,
            colonyId: 1,
            mineralId: 1,
            tons: 7
        },
        {
            id: 2,
            colonyId: 1,
            mineralId: 2,
            tons: 2
        }

    ],
    mineralFacilityJoins: [
        {
            id: 1,
            mineralId: 1,
            facilityId: 1,
            tons: 18
        },
        {
            id: 2,
            mineralId: 2,
            facilityId: 1,
            tons: 4
        },
        {
            id: 3,
            mineralId: 3,
            facilityId: 2,
            tons: 92
        },
        {
            id: 4,
            mineralId: 4,
            facilityId: 3,
            tons: 47
        },
        {
            id: 5,
            mineralId: 1,
            facilityId: 2,
            tons: 3
        },
        {
            id: 6,
            mineralId: 2,
            facilityId: 3,
            tons: 4
        },
        {
            id: 7,
            mineralId: 1,
            facilityId: 3,
            tons: 0
        }
    ],
    transientState: 
        {
            id: 0,
            orderBuilder: [
                
            ]

        }
}

export const setFacility = (object, facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityMineral = (facilityMineralId) => {
    database.transientState.selectedFacilityMineral = facilityMineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}

export const getGovernors = () => {
    return database.governors.map(g => ({ ...g }))
}

export const getColonies = () => {
    return database.colonies.map(c => ({ ...c }))
}

export const getMinerals = () => {
    return database.minerals.map(m => ({ ...m }))
}

export const getColonyMineralJoins = () => {
    return database.colonyMineralJoins.map(j => ({ ...j }))
}

export const getMineralFacilityJoins = () => {
    return database.mineralFacilityJoins.map(j => ({ ...j }))
}

export const getTransientState = () => {
    return {...database.transientState} 
}

export const purchaseMineral = () => {

    //This function will be called when purchase button is selected - event listener will be added to Exomine.js to look out for this
        // Event listener will have an if statement that makes sure that ALL NECESSARY SELECTIONS have been made prior to executing this function - otherwise, it will return an error message.
    
    /*
    1. get transient state
    2. use .find to see if any objects in colonyMineralJoins have matching colonyId and mineralId to selectedColony and selectedMineral in transient state - assign to a let variable
    3. if -> new variable is undefined or null, create new object
        4. newColonyMineralObject = {
            mineralId: transientState.selectedMineral,
            colonyId: transientState.selectedColony,
            tons: 0
        }
        5. let lastIndex = database.colonyMineralJoins.length - 1
        6. newColonyMineralObject.id = database.colonyMineralJoins[lastIndex].id + 1
        7. push new object to colonyMineralJoins
        8. run line 2 again to reassign variable 
    9. newObjectVariable.tons += 1
    10. use .find to find facilityMineralJoin object that has matching selectedFacilityMineral id in transient state, assign to a variable
    11. foundFacilityMineralJoin.tons - 1
    12. transientState (whatever its called ) = {}
    13. trigger stateChange event
    */

    let transientState = {...database.transientState}
    let foundColonyMineralJoin = database.colonyMineralJoins.find( colonyMineral => colonyMineral.colonyId === transientState.selectedColony && colonyMineral.mineralId === transientState.selectedMineral)
    if (foundColonyMineralJoin === null || foundColonyMineralJoin === undefined) {
        const newColonyMineralObject = {
            mineralId: transientState.selectedMineral,
            colonyId: transientState.selectedColony,
            tons: 0
        }

        const lastIndex = database.colonyMineralJoins.length - 1
        newColonyMineralObject.id = database.colonyMineralJoins[lastIndex].id + 1

        database.colonyMineralJoins.push(newColonyMineralObject)

        foundColonyMineralJoin = database.colonyMineralJoins.find( colonyMineral => colonyMineral.colonyId === transientState.selectedColony && colonyMineral.mineralId === transientState.selectedMineral)
    }
    foundColonyMineralJoin.tons += 1
    let foundFacilityMineralJoin = database.mineralFacilityJoins.find( facilityMineral => facilityMineral.id === transientState.selectedFacilityMineral)
    foundFacilityMineralJoin.tons -= 1

    //database.transientState = {}
    setFacilityMineral(0)
    setMineral(0)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setGovernor = (governorId) => {
    database.transientState.selectedGovernor = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    database.transientState.selectedMineral = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}


export const setColony = (colonyId) => {
    database.transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

