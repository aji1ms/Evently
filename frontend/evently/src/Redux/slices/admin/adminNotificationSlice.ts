import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Notification {
    _id: string;
    title: string;
    message: string;
    createdAt: Date;
}

interface AdminNotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    search: string;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalNotifications: number;
        hasNext: boolean;
        hasPrev: boolean;
    }
}

const initialState: AdminNotificationState = {
    notifications: [],
    loading: false,
    error: null,
    search: '',
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalNotifications: 0,
        hasNext: false,
        hasPrev: false,
    }
}

export const fetchAllNotifications = createAsyncThunk(
    "adminNotification/fetchAll",
    async (params: {
        search?: string;
        page?: number;
    } = {}, { rejectWithValue }) => {
        try {

            const { search, page } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (page) queryParams.append('page', page.toString());
            queryParams.append("limit", '5');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/notifications?${queryParams}`,
                { withCredentials: true }
            );
            return {
                notifications: res.data.data,
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalNotifications: res.data.totalNotifications,
                    hasNext: res.data.hasNext,
                    hasPrev: res.data.hasPrev,
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
        }
    }
)

export const createNotification = createAsyncThunk(
    "adminNotification/createNotification",
    async (data: { title: string; message: string; }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/createNotification`,
                data,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create notification");
        }
    }
);

export const editNotificationData = createAsyncThunk(
    "adminNotification/editNotification",
    async ({ notificationId, title, message }: { notificationId: string, title: string, message: string }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/editNotification/${notificationId}`,
                { title, message },
                { withCredentials: true }
            );

            return res.data.data as Notification;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to edit notification");
        }
    }
)

export const deleteNotification = createAsyncThunk(
    "adminNotification/delete",
    async (notificationId: string, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteNotification/${notificationId}`,
                { withCredentials: true }
            )
            return notificationId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete category");
        }
    }
)


const adminNotificationSlice = createSlice({
    name: "adminNotifications",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearSearch: (state) => {
            state.search = '';
            state.pagination.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Notifications
            .addCase(fetchAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.notifications;
                state.pagination = {
                    currentPage: action.payload.pagination.currentPage,
                    totalPages: action.payload.pagination.totalPages,
                    totalNotifications: action.payload.pagination.totalNotifications,
                    hasNext: action.payload.pagination.hasNext,
                    hasPrev: action.payload.pagination.hasPrev,
                };
            })
            .addCase(fetchAllNotifications.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Create Notification
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
                state.loading = false;
                state.notifications.push(action.payload);
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit Notification
            .addCase(editNotificationData.fulfilled, (state, action: PayloadAction<Notification>) => {
                const index = state.notifications.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.notifications[index] = action.payload
            })
            .addCase(editNotificationData.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Delete Notification
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter((u) => u._id !== action.payload);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
});

export const { setSearch, setPage, clearSearch } = adminNotificationSlice.actions;
export default adminNotificationSlice.reducer;