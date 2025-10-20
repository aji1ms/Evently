import InputArea from '../../components/user/Containers/GPT_Page/InputArea';
import Chat_Header from '../../components/user/Containers/GPT_Page/Chat_Header';
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { useChat } from '../../Hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import { connectWS } from '../../Socket';

const GPT = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const messages = useSelector((state: RootState) => state.authChats.messages);
    const typingUsers = useSelector((state: RootState) => state.authChats.typingUsers);

    const [_isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { sendMessage, sendTyping } = useChat();

    useEffect(() => {
        if (user) {
            const socket = connectWS();

            const checkConnection = () => {
                if (socket.connected) {
                    setIsConnected(true);
                } 
            };

            socket.on('connect', () => {
                setIsConnected(true);
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });

            checkConnection();

            return () => {
                socket.off('connect');
                socket.off('disconnect');
            };
        }
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getColorFromName = (name: string) => {
        const colors = [
            'bg-pink-500', 'bg-blue-500', 'bg-orange-500',
            'bg-teal-500', 'bg-purple-500', 'bg-green-500',
            'bg-red-500', 'bg-indigo-500', 'bg-yellow-500'
        ];
        const charCode = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const index = charCode % colors.length;
        return colors[index];
    };

    const formatTime = (timestamp: Date) => {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
                ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <Chat_Header />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-500">
                                <p className="text-lg font-medium">No messages yet</p>
                                <p className="text-sm">Be the first to start the conversation!</p>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isCurrentUser = msg.userId === user?._id;
                            return (
                                <div
                                    key={msg._id}
                                    className={`flex items-end space-x-2 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full ${getColorFromName(msg.username)} flex items-center justify-center shadow-sm`}>
                                            <span className="text-white text-xs font-semibold">
                                                {getInitials(msg.username)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                        {!isCurrentUser && (
                                            <p className="text-gray-700 text-xs font-medium mb-1 px-1">{msg.username}</p>
                                        )}
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl shadow-sm ${isCurrentUser
                                                ? 'bg-blue-500 text-white rounded-br-md'
                                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 px-1">
                                            {formatTime(msg.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {typingUsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                            <span className="text-gray-500 text-sm">
                                {typingUsers.map(u => u.username).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                            </span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <InputArea onSendMessage={sendMessage} onTyping={sendTyping} />
        </div>
    );
};

export default GPT;