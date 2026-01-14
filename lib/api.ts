import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const token = getCookie('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            deleteCookie('token');
            // Optional: Redirect to login
        }
        return Promise.reject(error);
    }
);

export const api = {
    get: client.get,
    post: client.post,
    put: client.put,
    delete: client.delete,
    createBlock: (data: any) => client.post('/blocks', data),
    updateBlock: (id: number, data: any) => client.put(`/blocks/${id}`, data),
    optimize: (tasks: any[]) => client.post('/optimize', tasks),
};
