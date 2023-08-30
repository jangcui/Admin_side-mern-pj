'use client';
// const base_url = 'https://jangcui-backend-project.onrender.com/api';
const baseUrl = process.env.BASE_URL;

const refreshToken = async () => {
    const response: any = await get('/admin/refresh');
    if (response) {
        localStorage.setItem('token', response.token);
    }
    return response.token;
};

export const getToken = () => {
    const token = localStorage.getItem('TOKEN') || null;
    return token;
};

/// fetch setup //
const request = async (path: string, method: string, data: any, token?: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    const options: RequestInit = {
        method: method,
        headers: headers,
        credentials: 'include',
        body: data ? JSON.stringify(data) : undefined,
    };
    const response = await fetch(`${baseUrl}${path}`, options);
    if (response.status === 401 && token) {
        const newToken = await refreshToken();
        if (newToken) {
            headers.set('Authorization', `Bearer ${newToken}`);
            const refreshedOptions: RequestInit = { ...options, headers };
            const refreshedResponse = await fetch(`${baseUrl}${path}`, refreshedOptions);
            return refreshedResponse.json();
        }
    }
    return response;
};

// Hàm GET
export const get = async <Response>(path: string, token?: string): Promise<Response> => {
    return request(path, 'GET', null, token);
};

// Hàm POST
export const post = async <Response>(path: string, data: any, token?: string): Promise<Response> => {
    return request(path, 'POST', data, token);
};

// Hàm PUT
export const put = async <Response>(path: string, data: any, token?: string): Promise<Response> => {
    return request(path, 'PUT', data, token);
};

// Hàm DELETE
export const Delete = async <Response>(path: string, token?: string): Promise<Response> => {
    return request(path, 'DELETE', null, token);
};
export default request;
