import { JWT_SECRET } from "@repo/validators/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


interface JwtPayload {
    id: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    
    const token = req.headers.authorization as unknown as string
    // console.log(validtoken);
    try {
        // const validtoken = token.split(' ')?.[1]
        const payload = jwt.verify(token,JWT_SECRET) as JwtPayload;
        // @ts-ignore
        req.UserID = payload.id    
        next()
    } catch (e) {
        return res.status(403).json({
            message: "You are not logged in"
        })
    }
}