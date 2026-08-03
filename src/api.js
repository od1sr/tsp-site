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

    return result
}

export async function getDevelopers() {
    const response = await fetch(`${API_BASE_URL}/developers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    return result
}

export async function getBoilers(developerId) {
    const response = await fetch(`${API_BASE_URL}/boilers${developerId ? `?developer_id=${developerId}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json();
    return result
}

export async function submitEnterpriseForm(formData) {
    const response = await fetch(`${API_BASE_URL}/enterprise`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
 
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
 
    const result = await response.json();
 
    return result;
}