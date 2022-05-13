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

/*-------------------Setter Functions--------------------------------------*/

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setGovernor = (governorId) => {
    database.transientState.selectedGovernor = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony = (colonyId) => {
    database.transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityMineral = (facilityMineralId) => {
    const currentFacility = database.transientState.selectedFacility
    const currentFacilityObject = database.transientState.orderBuilder.find(
        obj => obj.selectedFacility === currentFacility)
    currentFacilityObject.selectedFacilityMineral = facilityMineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    const currentFacility = database.transientState.selectedFacility
    const currentFacilityObject = database.transientState.orderBuilder.find(
        obj => obj.selectedFacility === currentFacility)
    currentFacilityObject.selectedMineral = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

/*--------------------Getter functions------------------*/

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
    return { ...database.transientState }
}

// create new object for selected facility and add it to transientState
export const createFacilityObject = (facilityId) => {
    const newObject = {
        selectedFacility: facilityId,
        selectedFacilityMineral: 0,
        selectedMineral: 0
    }
    database.transientState.orderBuilder.push(newObject)
}

// function to reset transientState if new Gov. is chosen or purchase made
export const resetTransientState = () => {

    database.transientState = {
        id: 0,
        orderBuilder: [

        ]
    }
    document.dispatchEvent(new CustomEvent("stateChanged"))
}


export const purchaseMineral = (orderObject) => {
    
    let transientState = { ...database.transientState } - // get transient state

        //find to see if any objects in colonyMineralJoins that match colonyId and mineralId to selectedColony and selectedMineral in transient state
        let foundColonyMineralJoin = database.colonyMineralJoins.find(colonyMineral => colonyMineral.colonyId === transientState.selectedColony && colonyMineral.mineralId === orderObject.selectedMineral)
    
        // if new variable is undefined or null, create new object
        if (foundColonyMineralJoin === null || foundColonyMineralJoin === undefined) { 
        const newColonyMineralObject = {
            mineralId: orderObject.selectedMineral,
            colonyId: transientState.selectedColony,
            tons: 0
        }

        // create new object ID
        const lastIndex = database.colonyMineralJoins.length - 1
        newColonyMineralObject.id = database.colonyMineralJoins[lastIndex].id + 1

        //push new object to colonyMineralJoins
        database.colonyMineralJoins.push(newColonyMineralObject)

        // re-assign variable
        foundColonyMineralJoin = database.colonyMineralJoins.find(colonyMineral => colonyMineral.colonyId === transientState.selectedColony && colonyMineral.mineralId === orderObject.selectedMineral)
    }

    // add/subtract minerals to/from corresponding inventory
    foundColonyMineralJoin.tons += 1
    let foundFacilityMineralJoin = database.mineralFacilityJoins.find(facilityMineral => facilityMineral.id === orderObject.selectedFacilityMineral)
    foundFacilityMineralJoin.tons -= 1

    //reset selected minerals back to 0 after purchase
    orderObject.selectedFacilityMineral = 0
    orderObject.selectedMineral = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}