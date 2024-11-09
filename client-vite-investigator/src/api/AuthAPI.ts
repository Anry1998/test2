import $api from "../http/http";
import {AxiosResponse} from 'axios'
import { AuthResponce } from "../models/response/AuthResponce";

export default class AuthAPI {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/auth/login', {email, password}) 
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/auth/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.delete('/auth/logout') 
    }
}