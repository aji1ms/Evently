import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

let socket: Socket | null = null;
let hasShownError = false;

export function connectWS(): Socket {
    if (socket?.connected) return socket;

    socket = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
        reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
        hasShownError = false;
    });

    socket.on("connect_error", (_error) => {
        if (!hasShownError) {
            toast.error("Failed to connect to chat. Please check your connection.");
            hasShownError = true;
        }
    })

    socket.on("disconnect", () => {
        toast.error("Connection lost. Trying to reconnect...");
    });

    return socket;
}

export function disconnectWS() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

export function getSocket(): Socket | null {
    return socket;
}