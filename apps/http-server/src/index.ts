import express from "express"
import { PrismaClient } from "@repo/db/client";
import { CreateUserSchema, loginUserSchema, RoomloginSchema } from "@repo/common/zod"
import { JWT_SECRET } from "@repo/validators/config"
import cors from 'cors';
import jwt from "jsonwebtoken"
import bycript, { hash } from "bcrypt";
import { authMiddleware } from "./middleware";
import multer from "multer";

const client = new PrismaClient();
const app = express()
app.use(cors())
app.use(express.json())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname.concat(file.originalname)); 
  }
});
const upload = multer({storage})

app.post('/fileupload',upload.fields([
    { name: 'file', maxCount: 3 },
  { name: 'gallery', maxCount: 8 }]), async (req, res) => {
  try {
    if (
      req?.files &&
      typeof req.files === 'object' &&
      !Array.isArray(req.files) &&
      (req.files['file'] || req.files['gallery'])
    ) {
      console.log(req.files, "Files uploaded");
      res.json({ message: "Files uploaded!", files: req.files });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  } catch (e: any) {
    res.status(411).json({
      error: "file not uploaded check it out yourself"
    });
}
})

// read whay removsamnc ed type module from there in pakate json what it dose

app.post('/signup', async (req, res) => {
    try {


        const userData = req.body;
        const Sheamdata = CreateUserSchema.safeParse(userData);

        if (!Sheamdata.success) {
            res.status(411).json({
                message: Sheamdata.error
            });
            return;
        }

        const userExists = await client.user.findFirst({
            where: {
                email: userData.email
            }
        })

        if (userExists) {
            res.status(403).json({
                messsage: "User already exists"
            })
        }

        const Slat = 10;
        const hashedPassword = await bycript.hash(userData.password, Slat);


        const UserCreatedData = await client.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                username: userData.username
            }
        })
        console.log(UserCreatedData);

        res.send({
            message: "User Created for you specally happy to have you!",
            user: { id: UserCreatedData.id, email: UserCreatedData.email }
        })
    } catch (e) {
        res.status(411).json({
            error: "Data base was not able to connect or someting"
        })
    }
})

app.post('/login', async (req, res) => {
    const logindata = req.body;
    const UserDataperfection = loginUserSchema.safeParse(logindata)

    if (!UserDataperfection.success) {
        res.status(411).json({
            message: UserDataperfection.error
        })
        return;
    }

    const UserExist = await client.user.findFirst({
        where: {
            email: logindata.email
        }
    })
    if (!UserExist) {
        res.status(403).json({
            message: "Your account is not been created you try diff One"
        })
        return;
    }

    const correctPassword = await bycript.compare(UserDataperfection.data.password, UserExist.password);
    if (!correctPassword) {
        res.status(411).json({
            message: "Password In-correct"
        })
        return
    }
    const token = jwt.sign({ id: UserExist.id }, JWT_SECRET)

    res.status(200).json({
        message: "You have sucessuflly login In",
        token
    })
    return;
})

// @ts-ignore
app.post("/room", authMiddleware, async (req, res) => {
    const RommData = req.body;

    const RommPerfectData = RoomloginSchema.safeParse(RommData)

    if (!RommPerfectData.success) {
        res.json({ message: 'Incorrect Input' })
    }
    // @ts-ignore
    const userId = req.UserID

    try{
    const room = await client.room.create({
        data :{
            slug :RommData.slug,
            adminId:userId
        }
    })
    res.status(201).json({
        message:room.id
    })
}catch(e){
    res.status(411).json({
        message:"Room already exists"
    })
}
})


app.get('/chats/:roomId', async(req,res)=>{
    const roomId = Number(req.params.roomId);
    // console.log(roomId, 'sdvjhsbvdjhb');
    
 const messages = await client.chat.findMany({
        where:{
            RoomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50
    })
// console.log(messages);

    res.json({
        messages
    })
return
})

app.get('/room/:slug', async(req,res)=>{
    const slug = req.params.slug;
 const room = await   client.room.findFirst({
        where:{
            slug
        }
    })
    res.json({
        room
    })
})
app.listen(4000, () => {
    console.log("HTTP Backend Working");
})