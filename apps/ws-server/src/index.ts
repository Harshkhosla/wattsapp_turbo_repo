import express from "express"
import { CreateUserSchema } from "@repo/common/zod"



const app = express()

app.get('/signup', async (req, res) => {

    const data1 = CreateUserSchema.parse(req.body);
    res.send({
        message: "health chsdcvsdvvvsveck"
    })
})

app.listen(4001,()=>{
    console.log("WS Backend Connected");
    
})