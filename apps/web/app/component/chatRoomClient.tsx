"use client"

import { ChatRoom } from "@repo/ui/chatRoom"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: { message: string }[],
    id: string
}) {
    const [chats, setChats] = useState(messages);
    const { loading, socket } = useSocket();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && socket) {
            socket.send(JSON.stringify({ type: "join_room", roomId: id }));

            const handleMessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats((c) => [...c, { message: parsedData.message }]);
                }
            };

            socket.addEventListener("message", handleMessage);

            return () => {
                socket.removeEventListener("message", handleMessage);
            };
        }
    }, [loading, id, socket]);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message
        }));
        setMessage('');
    };

    return (
        <>
            {chats?.map((m, index) => (
                <div key={index}>{m.message}</div>
            ))}
            <Input placeholder="Send Message" className="pt-2" value={message} onChange={onChange} />
            <Button children={"Submit"} className="mt-4" onClick={sendMessage} />
        </>
    );
}
