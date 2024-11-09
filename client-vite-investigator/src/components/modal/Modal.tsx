import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Form  } from 'react-bootstrap';


// import ChatService from "../../api/ChatService";

import { useSocketStore } from '../../store/socket-store/socket.store'

// import { WebsocketContext } from "../../context/WebsocketContext";

function ModalWindow( {messageId, message, getMessageList}: any ) {
  const [show, setShow] = useState(false);

//   console.log("message:", message)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [messageValue, setMessageValue] = useState<string>(message)


  // const socket = useContext(WebsocketContext)
  const { socket}  = useSocketStore(state => state)

  const saveChanges = () => {
    console.log('messageId: ', messageId)
    console.log('messageValue: ', messageValue)
    socket.emit('server-message:update', {messageId, messageValue})
    getMessageList()
    handleClose()
  }

  const deleteMessage = () => {
    console.log('messageId: ', messageId)
    socket.emit('server-message:delete', {messageId})
    getMessageList()
    handleClose()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cообщение № {messageId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control 
            placeholder="Содержание" 
            style={{width: '80%'}}
            value={messageValue} 
            onChange={e => setMessageValue(e.target.value)} 
            type="text"
        ></Form.Control>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Редактировать сообщение
          </Button>
          <Button variant="primary" onClick={deleteMessage}>
            Удалить сообщение
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;