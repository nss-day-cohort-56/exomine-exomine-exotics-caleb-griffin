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

        }
}

export const setFacility = (facilityId) => {
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
    
    //Function will check to see if an object within colony mineral joins exists that has colony id and mineral Id that matches mineral and colony within transient state
        // currently transient state does not have functionality to have colonyID and mineralID, only governorID and selectedFacilityMineralId

    // IF object does exist with this mineral Id and colony Id
        // increase tons in colonyMineralJoin by 1
        // decrement tons in facilityMineralJoin by 1
        // reset transient state

    // Else....
        //need to create a new object!
            // newObject.colonyID = transientState.selectedColony
            // newObject.mineralID = transientState.selectedMineral
            // use colonyMineralJoins.length to grab the last object and find its Id
            // newObject.tons = 1
        //


    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
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


