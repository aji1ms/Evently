import { Request, Response } from 'express';
const Message = require("../../models/messageSchema");

interface AuthRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}

const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 100;
        const skip = parseInt(req.query.skip as string) || 0;

        const messages = await Message.find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        console.log("Error fetching messages: ", error)
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getMessages,
}