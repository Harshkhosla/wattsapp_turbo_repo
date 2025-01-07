export default async function ({ params }: {
    params: {
        group: string
    }
}) {
    const data = params.group
    console.log(data);

    return <div>
        dvlkjsvndksjsdvb{data}
    </div>

}