import express from "express"


const app = express()
// app.cors()

app.get('/signup', async (req, res) => {
    res.send({
        message: "health chsdcvsdvvvsveck"
    })
})





app.listen(4000,()=>{
    console.log("HTTP Backend Working");
})