import { create } from "zustand"
import { jwtDecode } from 'jwt-decode'
import AuthAPI from "../../api/AuthAPI"


import axios from "axios"
import { AuthResponce } from "../../models/response/AuthResponce"


import {IEmployee} from '../../models/IEmployee'


import { io } from "socket.io-client";
// import { useSocketStore } from "../socket-store/socket.store"







export type AuthStore = {
    employee: IEmployee | null
    isAuth: boolean
    
    isLoading: boolean

    login: (email: string, password: string) => Promise<any>
    registration: (email: string, password: string) => Promise<any>
    logout: () => void
    checkAuth: () => any

    socketConnection: () => any
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    employee: null,
    isAuth: false,

    isLoading: false,

    login: async (email: string, password: string) =>  {
        set(() => ({isLoading: true}))
        try {
            const responce = await AuthAPI.login(email, password)
            localStorage.setItem('access-token', responce.data.accessToken)
            set(() => ({isAuth: true}))
            const employee: IEmployee = {
                id: responce.data.id,
                email: responce.data.email,
                organId: responce.data.organId.id,
                divisionId: responce.data.divisionId.id,
                posts: responce.data.post.id,
            }
            set(() => ({employee: employee}))
        } catch (e) {
            set(() => ({isAuth: false}))
            console.log(e)
            localStorage.removeItem('access-token')
            return e
        } finally {
            set(() => ({isLoading: false}))
        }
    },

    logout: async () => {
        try {
            await AuthAPI.logout()
            localStorage.removeItem('access-token')
            set(() => ({isAuth: false}))
        } catch (e) {
            console.log(e)
            return e
        }
    },

    registration: async(email: string, password: string) => {
        set(() => ({isLoading: true}))
        try {
            const responce = await AuthAPI.registration(email, password)
            const user: any = jwtDecode(responce.data.accessToken)
            localStorage.setItem('access-token', responce.data.accessToken)
            set(() => ({isAuth: true}))
            set(() => ({employee: user.payload}))
            // useSocketStore.getState().socketConnection()
        } catch (e) {
            set(() => ({isAuth: false}))
            localStorage.removeItem('access-token')
            console.log(e)
            return e
        } finally {
            set(() => ({isLoading: false}))
        }
    },

    checkAuth: async () => {
        set(() => ({isLoading: true}))
        try {
            const API_URL = import.meta.env.VITE_SERVER_URL
            const responce = await axios.get<AuthResponce>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('access-token', responce.data.accessToken)
            set(() => ({isAuth: true}))

            const employee: IEmployee = {
                id: responce.data.id,
                email: responce.data.email,
                organId: responce.data.organId.id,
                divisionId: responce.data.divisionId.id,
                posts: responce.data.post.id,
            }
            set(() => ({employee: employee}))
            
        } catch (e) {
            set(() => ({isAuth: false}))
            localStorage.removeItem('access-token')
            console.log(e)
            return e
        } finally { 
            set(() => ({isLoading: false}))
        }
    },



    socketConnection: async () => {
        try {
            console.log('get().employee?.id', get().employee?.id)
            const socket = io(import.meta.env.VITE_SERVER_URL,     {
                auth: {
                    accessToken: `Bearer ${localStorage.getItem('access-token')}`,
                },
                query: {employeeId: get().employee?.id} 
            }) 

            socket.on('connect', () => {
                console.log(socket)
                console.log('connect!') 
            })

            return socket

        } catch (e) {
            console.log(e)
            return e
        }
    },
}))