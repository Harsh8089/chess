import { useState, useEffect } from "react"
const SOCKET_URI = 'ws://localhost:8080'

function useSocket() {
    const [socket, setSocket] = useState(null)
    
    useEffect(() => {    
        const ws = new WebSocket(SOCKET_URI)
        ws.onopen = () => {
            setSocket(ws)
        }
        ws.onclose = () => {
            setSocket(null)
        }
        return () => {
            ws.close()
        }
    }, [])
    
    return socket
}

export default useSocket