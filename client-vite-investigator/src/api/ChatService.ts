import $api from "../http/http";
import {AxiosResponse} from 'axios'
import { ChatResponce } from "../models/response/ChatResponce";
import { IMessage } from "../models/response/IMessages";



// const {data} = await axios.get<AxiosResponse<any[]>>(`${API_URL}/chat/get-all-chat-message/${id}`, {withCredentials: true})

export default class ChatService {  

    static async getAllEmployeeChats(employeId: number): Promise<AxiosResponse<ChatResponce[]>> {
        return $api.get<ChatResponce[]>(`/chat/get-all-employee-chat?employeId=${employeId}`) 
    }

    static async getAllChatMessages(chatId: string | undefined, employeeId: number | undefined): Promise<AxiosResponse<IMessage[]>> {
        return $api.get<IMessage[]>(`/chat/get-all-chat-messages/${chatId}?employeId=${employeeId}`) 
    }

    // static async updateMessage(messageId: number, updateBodyMessage: string): Promise<AxiosResponse<IMessage>> {
    //     return $api.post<IMessage>('/api/chat/update-message', {messageId, updateBodyMessage})
    // }

    // static async logout(): Promise<void> {
    //     return $api.delete('/auth/logout')
    // }
}