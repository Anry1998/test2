import  {FC, useEffect,} from "react";
import {  Container,  } from 'react-bootstrap';
import ChatService from "../../api/ChatService";

import { useAuthStore } from "../../store/ayth-store/auth.store";
// import { ChatResponce } from "../../models/response/ChatResponce";
// import { useNavigate } from "react-router-dom";
import ChatsListComponent from "../../components/chat-list/ChatList";


const ChatsListPage: FC = () => {
    const {employee}  = useAuthStore(state => state)

    // const [ setChats] = useState<ChatResponce[]>([])

    useEffect( () => {
        getChats()
    }, [])
 
    

    const getChats = async () => {
        if (employee) {
            const chatsList = await ChatService.getAllEmployeeChats(employee?.id)
            console.log(employee?.id)
            console.log(chatsList)
            // setChats([...chatsList?.data])
        }
    }

    // const navigate = useNavigate()

    return(
        <Container>
            {/* <div>ChatsListPage</div> */}

            <ChatsListComponent/>

            {/* <div>div</div>
            {
                chats.map(item => {
                    return (
                        <div onClick={()=> navigate(`/chat/get-chat-messages/${item.id}`)} key={item.id}>
                            <div>{item.id}</div>
                            <div>{item.title}</div>
                        </div>
                    )
                })
            } */}
        </Container>
    )
}

export default ChatsListPage