import { Server, Socket } from 'socket.io';
const Message = require("../models/messageSchema")
const User = require('../models/userSchema');
import jwt from 'jsonwebtoken';

interface UserSocket extends Socket {
    userId?: string;
    username?: string;
}

function parseCookies(cookieString: string): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (!cookieString) return cookies;

    cookieString.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        const value = rest.join('=').trim();
        if (name && value) {
            cookies[name.trim()] = decodeURIComponent(value);
        }
    });

    return cookies;
}

export const setupSocketHandlers = (io: Server) => {
    io.use(async (socket: UserSocket, next) => {
        try {
            const cookieHeader = socket.handshake.headers.cookie;

            if (!cookieHeader) {
                return next(new Error('Authentication error: No cookies'));
            }

            const cookies = parseCookies(cookieHeader);

            const token = cookies.userToken || cookies.jwt || cookies.token;

            if (!token) {
                return next(new Error('Authentication error: No token'));
            }

            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                return next(new Error('Server configuration error'));
            }

            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

            const user = await User.findById(decoded.userId);

            if (!user) {
                return next(new Error('Authentication error: User not found'));
            }

            socket.userId = user._id.toString();
            socket.username = user.name;

            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                next(new Error('Authentication error: Token expired'));
            } else if (error instanceof jwt.JsonWebTokenError) {
                next(new Error('Authentication error: Invalid token'));
            } else {
                next(new Error('Authentication error: ' + (error as Error).message));
            }
        }
    });

    io.on('connection', async (socket: UserSocket) => {

        io.emit('user-connected', {
            username: socket.username,
            userId: socket.userId,
            timestamp: new Date()
        });

        try {
            const messages = await Message.find()
                .sort({ timestamp: -1 })
                .limit(100)
                .lean();

            socket.emit('load-messages', messages.reverse());

            socket.broadcast.emit('user-connected', {
                username: socket.username,
                userId: socket.userId,
                timestamp: new Date()
            });
        } catch (error) {
            socket.emit('message-error', { error: 'Failed to load message' });
        }

        socket.on('send-message', async (data: { message: string }) => {
            const { message } = data;

            if (!message || !message.trim()) {
                return;
            }

            try {
                const newMessage = new Message({
                    userId: socket.userId,
                    username: socket.username,
                    message: message.trim(),
                    timestamp: new Date()
                });

                await newMessage.save();

                io.emit('receive-message', {
                    _id: newMessage._id,
                    userId: newMessage.userId,
                    username: newMessage.username,
                    message: newMessage.message,
                    timestamp: newMessage.timestamp
                });
            } catch (error) {
                socket.emit('message-error', { error: 'Failed to send message' });
            }
        });

        socket.on('typing', (data: { isTyping: boolean }) => {
            socket.broadcast.emit('user-typing', {
                userId: socket.userId,
                username: socket.username,
                isTyping: data.isTyping
            });
        });

        socket.on('disconnect', () => {

            socket.broadcast.emit('user-disconnected', {
                username: socket.username,
                userId: socket.userId,
                timestamp: new Date()
            });
        });
    });
};