import express from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/validators/config"

interface Users {
    websocket :WebSocket;
    rooms :string[],
    userId :string
}

const users :Users[ ] = []
const wss = new WebSocketServer({ port: 8080 });

function UserCheck (token :string ):string | null{

    const user = jwt.verify(token, JWT_SECRET)

    if (typeof (user) === "string") {
        return null; 
    }
    // if(!user || !(user as JwtPayload).id) {    can be used as well
    if (!user || !user.id) {
        return null;
}
return user.userId
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const quesryPrams = new URLSearchParams(url.split('?')[1])
    const token = quesryPrams.get('token') || "";
    const userId = UserCheck(token)
    if(!userId){
        ws.close()
        return;
    }


    ws.on('message', function message(data) {
        ws.send("pong")
    })

})



// const app = express()



// app.listen(4001, () => {
//     console.log("WS Backend Connected");
// })