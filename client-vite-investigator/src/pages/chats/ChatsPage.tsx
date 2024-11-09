import  {FC,} from "react";
// import {  Link, NavLink, useNavigate  } from 'react-router-dom';


// import Images from "../../components/images/Images";
import { Outlet } from "react-router-dom";

import {  Container,  } from 'react-bootstrap';


// import io,  {Socket} from 'socket.io-client'
// import axios, { AxiosResponse } from "axios";

// import SocketApi from "../../socket-api/socket-api";
// import { useConnectSocket } from "../../hooks/useConnectSocket";
// import { WebsocketProvider, socket } from "../../context/WebsocketContext";
// import WebsocketComponent from "../../components/websocket/Websocket";
import ChatService from "../../api/ChatService";

// import { ChatResponce } from "../../models/response/ChatResponce";


ChatService



const ChatsPage: FC = () => {
    

    
 


    return(
        <Container>
                {/* <div className="wrapper">
                    <div className="block block-one">Функции</div>
                    <div className="block block-two">Главная</div>
                    <div className="block block-three">Вспомогательная</div>
                </div> */}
                <div className="wrapper">
                    <div className="block block2 block-one">
                    
                        {/* <div onClick={() => navigate('/employes')}>Найти</div>
                        <div onClick={() => navigate('/employes/create')}>Создать</div> */}
                        {/* <div>Чат</div> */}

                    </div>
                    <div className="block block2 block-two">
                        <Outlet/> 
                    </div>
                    <div className="block block2 block-three">

                    </div>
                </div>
        </Container>
    )
}

export default ChatsPage


{/* <Form>
<Form.Control 
    placeholder="Ваше имя" 
    style={{width: '45%'}}
    value={name} 
    onChange={e => setName(e.target.value)} 
    type="text"
></Form.Control>
<Form.Control 
    placeholder="Сообщение" 
    style={{width: '45%', marginTop: '50px'}}
    value={messagee} 
    onChange={e => setMessagee(e.target.value)} 
    type="text"
></Form.Control>
<Button onClick={() => sendMessage()} style={{marginTop: '100px'}}>Отправить</Button>      
</Form> */}