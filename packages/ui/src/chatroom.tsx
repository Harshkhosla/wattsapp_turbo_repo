import axios from "axios"

async function getChats(roomId:string) {
    const response = await axios.get(`http://localhost:3000/chats/${roomId}`)
    return response.data.message
}


export async function ChatRoom({id}:{
    id:string
}){
    const messages = await getChats(id);

    return (
        <div>
            
        </div>
    )


}