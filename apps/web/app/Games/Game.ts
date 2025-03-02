import { getRoomShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    height: number;
    width: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private socket: WebSocket;
    private clicked = false;
    private StartX = 0
    private StartY = 0
    private selectedTool = "rect"
    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.init();
        this.initHandlers();
        this.clearCanvas();
        this.initMouseHandlers();
        this.destroy()
    }
 destroy(){
    this.canvas.removeEventListener('mousedown', this.mousedownhandler.bind(this))    
        this.canvas.removeEventListener('mouseup', this.mouseuphandler.bind(this))
        this. canvas.removeEventListener('mousemove', this.mousemovehandler.bind(this))
 }
    selectTool(shape: string) {
        this.selectedTool = shape;
    }
    async init() {
        this.existingShapes = await getRoomShapes(this.roomId);
        this.clearCanvas();
    }
    initHandlers() {
        this.socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log(parsedData);

            if (parsedData.type === "chat") {
                console.log(parsedData.message);
                const shapesDatra = JSON.parse(parsedData.message);
                this.existingShapes.push(shapesDatra);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'rgba(0,0,0)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.existingShapes.forEach(shape => {
            if (shape.type == "rect") {
                this.ctx.strokeStyle = 'rgba(255,255,255)'
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
            } else if (shape.type == "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        })
    }

    mousedownhandler(e: MouseEvent) {
        this.clicked = true;
        this.StartX = e.clientX;
        this.StartY = e.clientY;
    }
    mouseuphandler(e: MouseEvent) {
        this.clicked = false;
        const width = e.clientX - this.StartX;
        const height = e.clientY - this.StartY;
        // @ts-ignore
        const selectedTool = this.selectedTool;
        if (selectedTool == "circle") {
            const raius = Math.sqrt(width ** 2 + height ** 2)
            const shape: Shape = { type: "circle", centerX: this.StartX, centerY: this.StartY, radius: raius };
            this.existingShapes.push(shape);
            this.socket.send(JSON.stringify({ type: "chat", message: JSON.stringify(shape), roomId: this.roomId }));
            this.clearCanvas();
        } else if (selectedTool == "rect") {
            const shape: Shape = { type: "rect", x: this.StartX, y: this.StartY, width, height };
            this.existingShapes.push(shape);
            this.socket.send(JSON.stringify({ type: "chat", message: JSON.stringify(shape), roomId: this.roomId }));
            this.clearCanvas();
        }
    }

    mousemovehandler(e: MouseEvent) {
        if(this.clicked){
            const width = e.clientX-this.StartX;
            const height = e.clientY-this.StartY;
            this.clearCanvas()
            this.ctx.strokeStyle = 'rgba(255,255,255)'
            // @ts-ignore
            const selectedTool = this.selectedTool;
            if(selectedTool == "rect"){
                this.ctx.strokeRect(this.StartX, this.StartY, width, height)
            }else if(selectedTool == "circle"){
                this.ctx.beginPath();
                this.ctx.arc(this.StartX, this.StartY, Math.sqrt(width**2 + height**2), 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener('mousedown', this.mousedownhandler.bind(this))    
        this.canvas.addEventListener('mouseup', this.mouseuphandler.bind(this))
        this. canvas.addEventListener('mousemove', this.mousemovehandler.bind(this))
    }
}