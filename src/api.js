import { API_BASE_URL } from './config'

export async function getAddressList(query) {
    const response = await fetch(`${API_BASE_URL}/address-prompt`, {
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
    // if(result && result.length === 1 && result[0] === query.query) {
    //     return []
    // }

    return result
}
