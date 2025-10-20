import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Message {
    _id: string;
    userId: string;
    username: string;
    message: string;
    timestamp: Date;
}

interface TypingUser {
    userId: string;
    username: string;
}

interface ChatState {
    messages: Message[];
    typingUsers: TypingUser[];
    onlineUsers: number;
}

const initialState: ChatState = {
    messages: [],
    typingUsers: [],
    onlineUsers: 0
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        addTypingUser: (state, action: PayloadAction<TypingUser>) => {
            const exists = state.typingUsers.find(u => u.userId === action.payload.userId);
            if (!exists) {
                state.typingUsers.push(action.payload);
            }
        },
        removeTypingUser: (state, action: PayloadAction<string>) => {
            state.typingUsers = state.typingUsers.filter(u => u.userId !== action.payload);
        },
        clearTypingUsers: (state) => {
            state.typingUsers = [];
        },
        setOnlineUsers: (state, action: PayloadAction<number>) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const {
    setMessages,
    addMessage,
    addTypingUser,
    removeTypingUser,
    clearTypingUsers,
    setOnlineUsers
} = chatSlice.actions;

export default chatSlice.reducer;