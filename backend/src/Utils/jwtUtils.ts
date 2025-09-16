import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "1d";

const generateJWT = (res: Response, userId: string) => {
    const token = jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: JWT_EXPIRY });

    const cookieMaxAge = 24 * 60 * 60 * 1000;

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: cookieMaxAge,
        path: '/',
    });
};

const clearJWT = (res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        expires: new Date(0),
        path: '/',
    });
}

export { generateJWT, clearJWT }; 