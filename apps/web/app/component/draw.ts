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

export  async function initDraw (canvas: HTMLCanvasElement  , roomId:string ){

    let  existingshapes: Shape[] = await getRoomId(roomId);

    const ctx = canvas.getContext('2d');
            
    if (!ctx) {
        return
    }
    ctx.fillStyle = 'rgba(0,0,0)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
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
                existingshapes.push({
                    type: "rect",
                    x: StartX,
                    y: StartY,
                    height,
                    width
                })
            })
            canvas.addEventListener('mousemove', (e) => {
                if(clicked){
                    const width = e.clientX-StartX;
                    const height = e.clientY-StartY;
                    clearCanvas(existingshapes, canvas, ctx)
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

async function getRoomId (slug:string){
    const response = await axios.get(`http://localhost:4000/chats/${roomId}`);
   const message =   response.data.messages
   const shape= message.map((x:{message:string})=>{
    const messageData = JSON.parse(x.message)
    return messageData
   })
   return shape;
}