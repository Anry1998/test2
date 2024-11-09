import  {FC, useEffect, useState} from "react";

import { Container, Form, Button , } from 'react-bootstrap';
// import { WebsocketContext } from "../../context/WebsocketContext";

import { useAuthStore } from "../../store/ayth-store/auth.store";
import { useSocketStore } from '../../store/socket-store/socket.store'
import { useParams } from "react-router-dom";

import ChatService from "../../api/ChatService";
import ModalWindow from "../modal/Modal";

type IMessage = {
    id: number
    chatId: string | undefined
    employeeId: number
    message: string
    createTime: Date
}

const WebsocketComponent: FC = () => {
    const {id} = useParams()
    const {employee}  = useAuthStore(state => state)

    const { socket}  = useSocketStore(state => state)
    
    // const socket = useContext(WebsocketContext)
    
    const [name, setName] = useState<string>('')
    const [messages, setMessages] = useState<any>([])

     

    useEffect(() => {
        getMessageList()
    }, [])

    useEffect(() => {  
        

        socket.on('client-message:send', (data: IMessage) => {
            console.log(data)
            getMessageList()
        }) 

        socket.on('client-message:update', (data: any) => {
            console.log(data)
            getMessageList()
        })

        socket.on('client-message:delete', (data: any) => {
            console.log(data)
            getMessageList()
        })

        return () => {
            // socket.off('client-message:send')
            // socket.off('client-message:update')
            // socket.off('client-message:delete')
        } 
    }, [])  

    let messageloading: boolean = false
    console.log(messageloading)
 
    const sendMessage =  () => {
        messageloading = true
        let messageId: number = messages.length ? messages[messages.length-1].id+1 : 1
        try { 
            if (employee) {
                const message: IMessage = {id: messageId, chatId: id, employeeId: employee.id, message: name, createTime: new Date()}
                console.log(message)
                socket.emit('server-message:send', {...message})    
            }
        } catch (e) {
            console.log(e)
        } finally {
            messageloading = false
        }
    }

    // const disconnectSocket =  () => {
    //     socket.emit('user_leave', `Пользователь с id: ${employee?.id} покинул чат`)
    // }

    const getMessageList = async () => {
        const {data} = await ChatService.getAllChatMessages(id , employee?.id)
        setMessages(data)
    }

    return(
        <Container>
            <div> 
                {
                    messages.sort((a: any, b: any) => a.id - b.id).map((item: any) => {
                        return (
                            <div key={item.id} style={{display: "flex", gap: '15px'}}>
                                <div>{item.id}</div>
                                <div>{item.employeeId}</div>
                                <div>{item.message}</div>
                                <div>{item.createTime}</div>
                                {
                                    item.employeeId === employee?.id 
                                    && <ModalWindow messageId={item.id} message={item.message} getMessageList={getMessageList}/>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <Form.Control 
                placeholder="Ваше имя" 
                style={{width: '45%'}}
                value={name} 
                onChange={e => setName(e.target.value)} 
                type="text"
            ></Form.Control>
            <Button onClick={sendMessage} style={{marginTop: '60px'}}>Отправить</Button> 
            {/* <Button onClick={disconnectSocket} style={{marginTop: '60px'}}>disconnectSocket</Button>  */}
        </Container>
    )
}

export default WebsocketComponent



