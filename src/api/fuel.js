export async function fetchFuelTypes(fuelTypeId) {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/fuel${fuelTypeId ? `?type=${fuelTypeId}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    
    return result['fuelTypes']
}