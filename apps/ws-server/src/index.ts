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

wss.on("connection", function connection(ws, request) {
    console.log("✅ New WebSocket connection established");

    const url = request.url;
    if (!url) {
        console.error("❌ Missing request URL");
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const userId = UserCheck(token);

    if (!userId) {
        console.error("❌ Invalid token, closing connection.");
        ws.close();
        return;
    }

    console.log(`🔹 User Connected: ${userId}`);

    users.push({
        ws,
        rooms: [],
        userId,
    });

    ws.on("message", async function message(data) {
        console.log("📩 Received message:", data.toString());

        const parsedData = JSON.parse(data.toString());

        if (parsedData.type === "join_room") {
            console.log(`🔹 User ${userId} joined room ${parsedData.roomId}`);
            const user = users.find((x) => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === "leave_room") {
            const user = users.find((x) => x.ws === ws);
            if (!user) {
                return
            }
            user.rooms = user.rooms.filter((x) => x === parsedData.roomId);
        }
        if (parsedData.type === "chat") {
            console.log(`💬 Chat message from ${userId}:`, parsedData.message);
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            try {
                const data = await prisma.chat.create({
                    data: {
                        message,
                        RoomId: roomId,
                        userId,
                    },
                });
                console.log("✅ Message stored in DB:", data);
            } catch (error) {
                console.error("❌ Error saving message to DB:", error);
            }

            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {
                    console.log(`📤 Sending message to room ${roomId}`);
                    user.ws.send(
                        JSON.stringify({
                            type: "chat",
                            message,
                            roomId,
                        })
                    );
                }
            });
        }
    });

    ws.on("close", () => {
        console.log(`❌ User ${userId} disconnected`);
    });
});




// const app = express()



// app.listen(4001, () => {
//     console.log("WS Backend Connected");
// })