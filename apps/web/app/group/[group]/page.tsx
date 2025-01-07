// "use client"
import { Text } from "@repo/ui/text";

export default async function ({ params }: {
    params: {
        group: string
    }
}) {
    const data = params.group
    console.log(data);

    return <div>
        <Text classname="mt-3 text-xl font-bold" children={`You have joined the room ${data}`}/>
    </div>

}