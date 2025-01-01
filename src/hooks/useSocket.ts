import { useEffect, useState } from "react"

export const useSocket  = (name : string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("connected");
            ws.send(JSON.stringify({type : "name", payload : name}))
            setSocket(ws);
        }
        ws.onclose = () => {
            console.log("disconnected");
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    }, [])

    return socket
}