import express from "express"


const app = express()

app.get('/signup', async (req, res) => {
    res.send({
        message: "health chsdcvsdvvvsveck"
    })
})

app.listen(4001,()=>{
    console.log("WS Backend Connected");
    
})