import express from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/validators/config"
import { PrismaClient } from "@repo/db/client";

interface Users {
    ws: WebSocket;
    rooms: string[],
    userId: string
}

const prisma = new PrismaClient()
const users: Users[] = []
const wss = new WebSocketServer({ port: 8080 });

function UserCheck(token: string): string | null {
    try {
        const user = jwt.verify(token, JWT_SECRET)

        if (typeof (user) === "string") {
            return null;
        }
        // if(!user || !(user as JwtPayload).id) {    can be used as well
        if (!user || !user.id) {
            return null;
        }
        return user.id
    } catch (e) {
        return null
    }
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const quesryPrams = new URLSearchParams(url.split('?')[1])
    const token = quesryPrams.get('token') || "";
    const userId = UserCheck(token)
     
    if (userId == null) {
        ws.close()
        return;
    }



    users.push({
        ws,
        rooms: [],
        userId,
    })

    
    ws.on('message', async function message(data) {
        const parsedData = JSON.parse(data.toString() as unknown as string);

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            console.log(user , 'dskvjdskjvb');
            
            user?.rooms.push(parsedData.roomId)
        }
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return
            }
            user.rooms = user.rooms.filter(x => x === parsedData.roomId);
        }

console.log(users,'sdvbsvdbdjvkbsdv');

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            await prisma.chat.create({
                data:{
                    message:message,
                    RoomId:roomId,
                    userId
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    ws.send(JSON.stringify({
                        type: "chat",
                        roomId,
                        message: message
                    }))
                }
            })
        }
    })

})



// const app = express()



// app.listen(4001, () => {
//     console.log("WS Backend Connected");
// })