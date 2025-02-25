import { useEffect, useState } from "react";
import { Ws_URL } from "../config";

export function useSocket(){
    const [loading, setLoading]= useState(true);
    const [ socket , setSocket ] = useState<WebSocket>()
const YOUR_TOKEN_HERE= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMzAyNTYzLWY4OWYtNDJhYi1iZTY0LWMxZmZhYWE0NGVmOSIsImlhdCI6MTc0MDQ2NzY0N30.W7J-rXLBLmZdebPXJ8PrP9zcEgK0q0D9p_7frTY4TYk'

    useEffect(()=>{
        const ws = new WebSocket(`ws://localhost:8080/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMzAyNTYzLWY4OWYtNDJhYi1iZTY0LWMxZmZhYWE0NGVmOSIsImlhdCI6MTc0MDQ2NzY0N30.W7J-rXLBLmZdebPXJ8PrP9zcEgK0q0D9p_7frTY4TYk`);
            // const ws = new WebSocket(`${Ws_URL}?token=${encodeURIComponent(YOUR_TOKEN_HERE)}`);

        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)
        }
    },[])

    return {
        loading,
        socket
    }

}