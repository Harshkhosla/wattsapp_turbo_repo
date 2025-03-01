
import { Text } from "@repo/ui/text";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { ChatRoomcmp } from "../../component/ChatRoomcmp";
import Canvas from "../../component/Canvas";

async function getRoomId (slug:string){
    
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room?.id

}

export default  async function ChatRoom({ params }: {
    params: {
        slug: string
    }
}) {
    const slug =  await params?.slug
    console.log(slug);
    
    const roomId = await getRoomId(slug)
    return <div>

        <Text classname="mt-3 text-xl font-bold" children={`You have joined the room ${roomId}`}/>
       <Canvas id={roomId}/>
        {/* <ChatRoomcmp id={roomId}/> */}
    </div>

}