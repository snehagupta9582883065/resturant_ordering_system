import { API_BASE_URL } from "../config/api.config";

export const fetchApi = async (method, endpoint, token = null, data = null) => {
    const headers = {};
    
    if (token) {
        headers['x-auth-token'] = token;
    }

    if (data || method === 'POST' || method === 'PUT' || method === 'PATCH') {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = (response.headers.get('content-type') || '').includes('application/json')
        ? await response.json().catch(() => ({}))
        : {};

    if (!response.ok) {
        throw new Error(result.msg || response.statusText || `Request to ${endpoint} failed with status ${response.status}`);
    }
    
    return result;
};