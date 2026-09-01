export async function getBuildingTypes() {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/building-types`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const result = await response.json();
    return result['building_types']
}

export async function getBuildingThemralCharacteristics(buildingTypeId, volume) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/building-thermal-characteristics?building_type_id=${buildingTypeId}&volume=${volume}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    return result['thermal_characteristics'][0]
}