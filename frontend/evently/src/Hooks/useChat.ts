import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSocket } from '../Socket';
import {
    setMessages,
    addMessage,
    addTypingUser,
    removeTypingUser
} from '../Redux/slices/auth/chatSlice';
import toast from 'react-hot-toast';

export const useChat = () => {
    const dispatch = useDispatch();
    const socket = getSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('load-messages', (messages) => {
            dispatch(setMessages(messages));
        });

        socket.on('receive-message', (message) => {
            dispatch(addMessage(message));
        });

        socket.on('user-typing', (data) => {
            if (data.isTyping) {
                dispatch(addTypingUser({ userId: data.userId, username: data.username }));
            } else {
                dispatch(removeTypingUser(data.userId));
            }
        });

        socket.on('user-connected', (data) => {
            if (data && data.username) {
                toast.success(`${data.username} joined the community`, {
                    icon: '👋',
                    duration: 1000
                });
            }
        });

        socket.on('user-disconnected', (data) => {
            if (data && data.username) {
                toast(`${data.username} left the community`, {
                    icon: '👋',
                    duration: 1000
                });
            }
        });

        return () => {
            socket.off('load-messages');
            socket.off('receive-message');
            socket.off('user-typing');
            socket.off('user-connected');
            socket.off('user-disconnected');
        };
    }, [socket, dispatch]);

    const sendMessage = useCallback((message: string) => {
        if (socket && socket.connected && message.trim()) {
            socket.emit('send-message', { message });
        } else {
            toast.error('Not connected to chat server');
        }
    }, [socket]);

    const sendTyping = useCallback((isTyping: boolean) => {
        if (socket && socket.connected) {
            socket.emit('typing', { isTyping });
        }
    }, [socket]);

    return { sendMessage, sendTyping };
};