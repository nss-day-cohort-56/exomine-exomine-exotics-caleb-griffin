const database = {
    governers: [
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
            name: 'Ganymede'
        },
        {
            id: 2,
            name: 'Io'
        },
        {
            id: 3,
            name: 'Titan'
        },
    ],
    colonyMineralJoins: [
        {
            id: 1,
            colonyId: 1,
            mineralId: 1,
        },
        
    ],
    mineralFacilityJoins: [
        {
            id: 1,
            mineralId: 1,
            facilityId: 1
        },
        {
            id: 2,
            mineralId: 2,
            facilityId: 1
        },
        {
            id: 3,
            mineralId: 3,
            facilityId: 2
        },
        {
            id: 4,
            mineralId: 4,
            facilityId: 3
        },
    ],
    transientState: [
        {
            id: 0,

        }
    ]
}

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}

export const getGoverners = () => {
    return database.governers.map(g => ({...g}))
}

export const getColonies = () => {
    return database.colonies.map(c => ({...c}))
}

export const getMinerals = () => {
    return database.minerals.map(m => ({...m}))
}

export const getColonyMineralJoins = () => {
    return database.colonyMineralJoins.map(j => ({...j}))
}

export const getMineralFacilityJoins = () => {
    return database.mineralFacilityJoins.map(j => ({...j}))
}

export const purchaseMineral = () => {

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

