import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "1d";

const generateJWT = (res: Response, userId: string, cookieName: string = "jwt") => {
    const token = jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: JWT_EXPIRY });
    const cookieMaxAge = 24 * 60 * 60 * 1000;

    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: cookieMaxAge,
        path: '/',
    });
};

const clearJWT = (res: Response, cookieName: string = "jwt") => {
    res.cookie(cookieName, "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
        path: '/',
    });
}

export {
    generateJWT, clearJWT
};                                                                                                                                                                                                               