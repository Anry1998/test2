import io,  {Socket} from 'socket.io-client'

 class SocketApi {
    static socket: null | Socket = null

    static createConnection() {
        this.socket = io('http://localhost:5001')

        // this.socket = io('http://localhost:5000/', {
        //     query: {token}
        // })

        

        this.socket.on('connect', () => {
            console.log('connect')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })
    }
}

export default SocketApi