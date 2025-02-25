
import axios from "axios"
import { ChatRoomClient } from "./chatRoomClient"

async function getChats(roomId:string) {
    const response = await axios.get(`http://localhost:4000/chats/${roomId}`)
    return response.data.messages
}


export async function ChatRoomcmp({id}:{
    id:string
}){
    console.log(id , 'sdvjhsbvjvbdshvbh');
    
    const messages = await getChats(id);

    console.log(messages ,"dsvkjhsdvsb");
    
    return (
        <div>
           <ChatRoomClient messages={messages} id={id}/>
        </div>
    )
}