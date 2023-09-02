const baseUrl = process.env.BASE_URL;
// const baseUrl = 'http://localhost:4000/api';

export const getToken = () => {
    const token = localStorage.getItem('TOKEN') || null;
    return token;
};
export const refreshToken = async () => {
    try {
        const response: Response = await get(`/admin/refresh`);
        const result = await response.json();

        return result;
    } catch (error: any) {
        return error;
    }
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
            localStorage.setItem('TOKEN', newToken);
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
