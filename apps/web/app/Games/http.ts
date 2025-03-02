import axios from "axios";

export async function getRoomShapes(roomId: string) {
    try {
        const response = await axios.get(`http://localhost:4000/chats/${roomId}`);
        return response.data.messages.map((x: { message: string }) => JSON.parse(x.message));
    } catch (error) {
        console.error("Error fetching room data:", error);
        return [];
    }
}