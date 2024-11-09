import { create } from "zustand"
import { io, Socket } from "socket.io-client";

export type useSocketStore = {
    socket: Socket
}

export const useSocketStore = create<useSocketStore>(() =>  ({
    socket: io(import.meta.env.VITE_SERVER_URL_SOCKET,{
        autoConnect: false
    })
}))