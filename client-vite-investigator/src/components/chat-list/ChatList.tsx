import  {FC, useEffect, useState} from "react";
import { Container } from 'react-bootstrap';
import ChatService from "../../api/ChatService";

import { useAuthStore } from "../../store/ayth-store/auth.store";
import { ChatResponce } from "../../models/response/ChatResponce";
import { useNavigate } from "react-router-dom";

import styleChats from './ChatList.module.scss'

const ChatsListComponent: FC = () => {

    const {employee}  = useAuthStore(state => state)
    const [chats, setChats] = useState<ChatResponce[]>([])

    useEffect( () => {
        getChats()
    }, [])

    const getChats = async () => {
        if (employee) {
            const chatsList = await ChatService.getAllEmployeeChats(employee?.id)
            console.log(employee?.id)
            console.log(chatsList)
            setChats([...chatsList?.data])
        }
    }

    const navigate = useNavigate() 
    

    return(
        <Container>
            {/* <div >ChatsListComponent</div> */}
            <div className={styleChats.divChatsList}>
                <div className={styleChats.messageSerchBorder}>
                    Poisk
                    {/* <input width={'100%'} height={'100%'} style={{background: 'red'}} placeholder="поиск"/> */}
                </div>
                {
                    chats.map(item =>{
                        return (
                            <div className={styleChats.divChatItem} onClick={()=> navigate(`/chat/get-chat-messages/${item.id}`)} key={item.id}>
                                {/* <div>{item.id}</div> */}
                                <div>{item.title}</div>
                                <div>{item.createTime}</div>
                            </div>
                        )
                    })
                }
            </div>

        </Container>
    )
}

export default ChatsListComponent