import { useEffect, useState } from "react"
import SocketApi from "../socket-api/socket-api"
import axios from "axios"
// import SocketApi from "../api/socket-api"


export const useConnectSocket = () => {
    const [message, setMessage] = useState<string>('')
    console.log(message)
    const [messagersList, setMessagersList] = useState<any[]>([])
    console.log(messagersList)

    const getMessagersList = async () => {
        const API_URL = 'http://localhost:5001'
        return await axios.get(`${API_URL}/chat/get-messages`)
        
    }

    const connectSocket = () => {
        SocketApi.createConnection()
        SocketApi.socket?.on('client-path', (data) => {
            console.log("New message added", data);
            setMessage(JSON.stringify(data))
            // setMessagersList([...messagersList, {chatId: 1, userId: 2, message: message }])

            let messagersListA = messagersList.push({chatId: 1, userId: 2, message: message })
            console.log("messagersListA", messagersList)
            setMessagersList([messagersListA])
        })
    }

    useEffect(() => {
        getMessagersList()
        connectSocket()
    }, [])
    return {message}
}