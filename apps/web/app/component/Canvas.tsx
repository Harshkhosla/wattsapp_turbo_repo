"use client";

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../Games/draw";
import { useSocket } from "../hooks/useSocket";
import { Button } from "@repo/ui/button";
import { Game } from "../Games/Game";

export default function Canvas(roomId: string) {
    const canvasref = useRef<HTMLCanvasElement>(null);
    const [shape, setShape] = useState<string>("rect")
    const [game , setGame ] = useState<Game | null>(null)

    const onchange = () => {
        setShape("rect")
    }
    const onchange1 = () => {
        setShape("circle")
    }
    const onchange2 = () => {
        setShape("line")
    }
    const { loading, socket } = useSocket();
    useEffect(() => {
        game?.selectTool(shape)

    },[shape, game ])

    useEffect(() => {
        if (socket) {
            socket.send(JSON.stringify({ type: "join_room", roomId: roomId?.id }));
            if (canvasref.current) {
                const canvas = canvasref.current;
                const g = new Game(canvas, roomId?.id, socket);
                setGame(g)
                return()=>{
                    g.destroy()
                }
                // without classs uing hooks
                // initDraw(canvas, roomId?.id, socket)
            }
        }
    }, [canvasref, socket, roomId]);
    return (
        <div>
            {
                loading && <div>Loading</div>
            }
            {!loading &&
                <div style={{ height: "100vh", overflow: "hidden" }}>

                    <canvas style={{ position: "relative" }} id="canvas" ref={canvasref} width={window.innerWidth} height={window.innerHeight} className="border-2 border-black" ></canvas>
                    <div className="flex justify-center border border-black" style={{ position: "absolute", top: "0", width: "100%" }}>
                        <Button
                            className={`my-4 mx-4 px-3 py-2 rounded-md border text-white ${shape === "rect" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-red-500 hover:bg-red-600"
                                }`}
                            appName="Square"
                            onClick={onchange}
                        >
                            Square
                        </Button>
                        <Button
                            className={`my-4 mx-4 px-3 py-2 rounded-md border text-white ${shape === "circle" ? "bg-teal-500 hover:bg-teal-600" : "bg-orange-500 hover:bg-orange-600"
                                }`}
                            appName="Circle"
                            onClick={onchange1}
                        >
                            Circle
                        </Button>
                        <Button
                            className={`my-4 mx-4 px-3 py-2 rounded-md border text-white ${shape === "line" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                                }`}
                            appName="Line"
                            onClick={onchange2}
                        >
                            Line
                        </Button>

                    </div>
                </div>
            }

        </div>
    )
}