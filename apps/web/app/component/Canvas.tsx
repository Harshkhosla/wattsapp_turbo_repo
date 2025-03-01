"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "./draw";
import { useSocket } from "../hooks/useSocket";

export default function Canvas(roomId: string) {
    const canvasref = useRef<HTMLCanvasElement>(null);

    const { loading, socket } = useSocket();
    useEffect(() => {
        if (socket) {
            socket.send(JSON.stringify({ type: "join_room", roomId: roomId?.id }));
            if (canvasref.current) {
                const canvas = canvasref.current;
                initDraw(canvas, roomId?.id, socket)
            }
        }
    }, [canvasref, socket, roomId]);
    return (
        <div>
            {
                loading && <div>Loading</div>
            }
            {!loading &&
                <canvas id="canvas" ref={canvasref} width={1380} height={720} className="border-2 border-black"></canvas>
            }
        </div>
    )
}