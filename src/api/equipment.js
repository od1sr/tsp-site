export async function getDevelopers() {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/developers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    return result['developers']
}

export async function getBoilers(developerId) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/boilers${developerId ? `?developer_id=${developerId}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    return result['boilers']
}