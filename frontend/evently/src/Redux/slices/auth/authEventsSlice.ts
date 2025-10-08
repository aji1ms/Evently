import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface EventData {
    _id: string;
    title: string;
    description: string;
    category: string;
    eventType: string;
    meetingLink?: string;
    location?: {
        venue: string;
        address: string;
        city: string;
        state: string;
    };
    eventDate: string;
    eventTime: string;
    regularPrice: number;
    salePrice: number;
    totalSeats: number;
    availableSeats: number;
    organizer: string;
    image: string;
    status: string;
}

interface EventState {
    events: EventData[];
    eventDetails: EventData | null;
    loading: boolean;
    error: string | null;
    search: string;
    filters: {
        type: string;
        category: string;
    };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalEvents: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

const initialState: EventState = {
    events: [],
    eventDetails: null,
    loading: false,
    error: null,
    search: '',
    filters: {
        type: '',
        category: '',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalEvents: 0,
        hasNext: false,
        hasPrev: false,
    },
};

export const userLoadEvents = createAsyncThunk(
    'auth/loadEvents',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/loadEvents`,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load events");
        }
    }
);

export const fetchAllEvents = createAsyncThunk(
    'auth/events',
    async (params: {
        search?: string;
        type?: string;
        category?: string;
        page?: number;
    } = {}, { rejectWithValue }) => {
        try {
            const { search, type, category, page } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (type && type !== '') queryParams.append('type', type);
            if (category && category !== '') queryParams.append('category', category);
            if (page) queryParams.append('page', page.toString());
            queryParams.append("limit", '4');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/events?${queryParams.toString()}`,
                { withCredentials: true }
            );

            return {
                events: res.data.data,
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalEvents: res.data.totalEvents,
                    hasNext: res.data.hasNext,
                    hasPrev: res.data.hasPrev,
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load events");
        }
    }
);

export const getEventDetails = createAsyncThunk(
    'auth/getEventDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/event/${id}`,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load event details");
        }
    }
)

const authEventslice = createSlice({
    name: "authEvents",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ type?: string; category?: string }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.filters = { type: '', category: '' };
            state.pagination.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Load Events
            .addCase(userLoadEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLoadEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(userLoadEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Load Events
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload.events;
                state.pagination = {
                    currentPage: action.payload.pagination.currentPage,
                    totalPages: action.payload.pagination.totalPages,
                    totalEvents: action.payload.pagination.totalEvents,
                    hasNext: action.payload.pagination.hasNext,
                    hasPrev: action.payload.pagination.hasPrev,
                }
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Event Details
            .addCase(getEventDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.eventDetails = action.payload;
            })
            .addCase(getEventDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});
export const { setSearch, setFilters, setPage, clearFilters, } = authEventslice.actions;
export default authEventslice.reducer;