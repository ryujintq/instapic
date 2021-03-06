import { createContext, useContext, useEffect, useState } from "react"
import socketIOClient from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ id, token, children }) => {
    const [socket, setSocket] = useState('')

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:5000', { query: { id, token } })

        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}