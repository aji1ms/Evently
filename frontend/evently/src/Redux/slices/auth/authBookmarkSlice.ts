import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Bookmark {
    _id: string;
    user: string;
    event: {
        _id: string;
        title: string;
        description: string;
        image: string;
        meetingLink?: string;
        location?: {
            venue: string;
            address: string;
            city: string;
            state: string;
        };
        category: {
            name: string;
        }
        eventDate: string;
        eventTime: string;
        eventType: string;
        totalSeats: number;
        salePrice: number;
        availableSeats: number;
        organizer: string;
    };
    createdAt: string;
}

interface BookmarkState {
    bookmarks: Bookmark[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: BookmarkState = {
    bookmarks: [],
    loading: false,
    error: null,
    success: false,
}

export const addToBookmark = createAsyncThunk(
    'auth/addToBookmark',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/addToBookmark`,
                { eventId },
                { withCredentials: true }
            )

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to add bookmark");
        }
    }
)

export const removeFromBookmark = createAsyncThunk(
    'bookmark/removeFromBookmark',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/removeBookmark`,
                {
                    data: { eventId },
                    withCredentials: true
                }
            );

            return { eventId, message: res.data.message };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove bookmark");
        }
    }
);

export const getUserBookmarks = createAsyncThunk(
    'bookmark/getUserBookmarks',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/bookmarks`,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookmarks");
        }
    }
);

const bookmarkSlice = createSlice({
    name: "authBookmark",
    initialState,
    reducers: {
        clearBookmarkError: (state) => {
            state.error = null;
        },
        clearBookmarkSuccess: (state) => {
            state.success = false;
        },
        resetBookmarkState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add To Bookmark
            .addCase(addToBookmark.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addToBookmark.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bookmarks.push(action.payload);
            })
            .addCase(addToBookmark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Remove From Bookmark
            .addCase(removeFromBookmark.fulfilled, (state, action) => {
                state.bookmarks = state.bookmarks.filter(
                    bookmark => bookmark.event._id !== action.payload.eventId
                );
            })
            .addCase(removeFromBookmark.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Get User Bookmarks
            .addCase(getUserBookmarks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarks = action.payload;
            })
            .addCase(getUserBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearBookmarkError, clearBookmarkSuccess, resetBookmarkState } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;