// Axios shared instance
// Configure base URL and interceptors here

import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors (401, 403, etc.)
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('accessToken')
        }
        return Promise.reject(error)
    }
)

export default api
