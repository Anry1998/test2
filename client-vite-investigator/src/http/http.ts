import axios from 'axios'
import { AuthResponce } from "../models/response/AuthResponce"

export const API_URL = import.meta.env.VITE_SERVER_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`
    return config;
})

$api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const responce = await axios.get<AuthResponce>(`${API_URL}/auth/refresh`, {withCredentials: true})
            console.log(responce)
            localStorage.setItem('access-token', responce.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log("Не авторизован")
        }
    }
    throw error
})

export default $api