import express from "express"
import { PrismaClient } from '@repo/db';
// import { userSchema } from "@repo/common/src/types"
import { JWT_SECRET } from "@repo/validators/config"

const client = new PrismaClient();
const app = express()
// app.cors()


// read whay removsamnc ed type module from there in pakate json what it dose

app.get('/signup', async (req, res) => {

    console.log(JWT_SECRET);
    const data = await client.user.create({
        data: {
            email: "harsh",
            password: "jdvhsdv",
            username: "sample"
        }
    })
    res.send({
        message: "health chsdcvsdvvvsveck"
    })
})






app.listen(4000, () => {
    console.log("HTTP Backend Working");
})