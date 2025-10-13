import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Notification {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
}

export const fetchNotifications = createAsyncThunk(
    "auth/notifications",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/notifications`,
                { withCredentials: true }
            )

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load notifications");
        }
    }
)

export const markAllAsRead = createAsyncThunk(
    "auth/mark-all-read",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/mark-all-read`,
                {},
                { withCredentials: true }
            )

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load notifications");
        }
    }
)

const notificationSlice = createSlice({
    name: "authNotfications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Mark All Read As
            .addCase(markAllAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(markAllAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default notificationSlice.reducer;