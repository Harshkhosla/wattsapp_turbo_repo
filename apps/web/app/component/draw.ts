import axios from "axios";
import { BACKEND_URL } from "../config";

type Shape = {
    type :"rect";
    x :number ;
    y:number;
    height:number;
    width:number;
} |{
    type:"circle";
    centerX:number;  
    centerY:number;
    radius:number;
}

export  async function initDraw (canvas: HTMLCanvasElement  , roomId:string , socket: WebSocket ){
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let existingShapes: Shape[] = await getRoomShapes(roomId);
    console.log(existingShapes);
    

    // Ensure canvas is cleared and set to black
    clearCanvas(existingShapes, canvas, ctx);
    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        
        if (parsedData.type === "chat") {
            console.log(parsedData.message);
            const shapesDatra = JSON.parse(parsedData.message);
            existingShapes.push(shapesDatra);
            clearCanvas(existingShapes, canvas, ctx);
        }
    };
            let clicked = false;
            let StartX= 0 
            let StartY= 0 
            canvas.addEventListener('mousedown', (e) => {
                clicked = true;
                StartX= e.clientX;
                StartY= e.clientY;
            })
            canvas.addEventListener('mouseup', (e) => {
                clicked = false;
                const width = e.clientX-StartX;
                const height = e.clientY-StartY;
                const shape: Shape = { type: "rect", x:StartX, y:StartY, width, height };
                existingShapes.push(shape);
                socket.send(JSON.stringify({ type: "chat", message: JSON.stringify(shape) ,roomId }));
                clearCanvas(existingShapes, canvas, ctx);
               
            })
            canvas.addEventListener('mousemove', (e) => {
                if(clicked){
                    const width = e.clientX-StartX;
                    const height = e.clientY-StartY;
                    clearCanvas(existingShapes, canvas, ctx)
                    ctx.strokeStyle = 'rgba(255,255,255)'
                    ctx.strokeRect(StartX, StartY, width, height)
                }
            })
}



function clearCanvas(existingShapes :Shape[], canvas: HTMLCanvasElement , ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    existingShapes.forEach(shape=>{
        if(shape.type == "rect"){
            ctx.strokeStyle = 'rgba(255,255,255)'
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })

}

async function getRoomShapes(roomId: string) {
    try {
        const response = await axios.get(`http://localhost:4000/chats/${roomId}`);
        return response.data.messages.map((x: { message: string }) => JSON.parse(x.message));
    } catch (error) {
        console.error("Error fetching room data:", error);
        return [];
    }
}