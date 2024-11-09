// import { Message, Prisma } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import io,  {Socket} from 'socket.io-client'

// import { SERVER_URI, USER_INFO } from "../constants";

// import { MessageUpdatePayload, UserInfo } from "../types";
// import { storage } from "../utils";

// экземпляр сокета
let socket: Socket;

interface IUser {
    userId: number
    userName: string
    text: string
}

export const useChat = () => {
//   const userInfo = storage.get<UserInfo>(USER_INFO) as UserInfo;

  // это важно: один пользователь - один сокет
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      // помните сигнатуру объекта `handshake` на сервере?
      query: {
        userName: 'Anry'
      }
    });
  }

  const [messages, setMessages] = useState<string[]>();
  const [log, setLog] = useState<string>();

  useEffect(() => {
    // подключение/отключение пользователя
    socket.on("log", (log: string) => {
      setLog(log);
    });

    // получение сообщений
    socket.on("messages", (messages: string[]) => {
      setMessages(messages);
    });

    socket.emit("messages:get");
  }, []);

  // отправка сообщения
  const send = useCallback((payload: {message: IUser}) => {
    socket.emit("message:post", payload);
  }, []);

  // обновление сообщения
  const update = useCallback((payload: any) => {
    socket.emit("message:put", payload);
  }, []);

  // удаление сообщения
  const remove = useCallback((payload: any) => {
    socket.emit("message:delete", payload);
  }, []);

  // очистка сообщения - для отладки при разработке
  // можно вызывать в консоли браузера, например
//   window.clearMessages = useCallback(() => {
//     socket.emit("messages:clear");
//     location.reload();
//   }, []);

  // операции
  const chatActions = useMemo(
    () => ({
      send,
      update,
      remove
    }),
    []
  );

  return { messages, log, chatActions };
};