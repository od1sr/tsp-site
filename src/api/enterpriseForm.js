export async function submitEnterpriseForm(formData) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/calculation/preview`, {
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