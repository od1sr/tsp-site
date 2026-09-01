export async function getAddressList(query) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();

    return result['addresses']
}