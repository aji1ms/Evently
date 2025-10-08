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
    loading: boolean;
    error: string | null;
    success: string | null;
    search: string;
    filters: {
        status: string;
        category: string;
    };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalEvents: number;
        hasNext: boolean;
        hasPrev: boolean;
        ongoingEvents: number;
        completedEvents: number;
        upcomingEvents: number;
    };
    editingEvent: EventData | null;
    editLoading: boolean;
    editError: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
    success: null,
    search: '',
    filters: {
        status: 'all',
        category: 'all',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalEvents: 0,
        hasNext: false,
        hasPrev: false,
        ongoingEvents: 0,
        completedEvents: 0,
        upcomingEvents: 0,
    },
    editingEvent: null,
    editLoading: false,
    editError: null,
};

export const adminAddEvent = createAsyncThunk(
    'adminEvents/addEvent',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addEvent`,
                formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            return res.data.event;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create event");
        }
    }
);

export const fetchAllEvents = createAsyncThunk(
    'adminEvents/getEvent',
    async (params: {
        search?: string;
        status?: string;
        category?: string;
        page?: number;
    } = {}, { rejectWithValue }) => {
        try {

            const { search, status, category, page } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (status && status !== 'all') queryParams.append('status', status);
            if (category && category !== 'all') queryParams.append('category', category);
            if (page) queryParams.append('page', page.toString());
            queryParams.append("limit", '6');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/events?${queryParams}`,
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
                    ongoingEvents: res.data.ongoingEvents,
                    completedEvents: res.data.completedEvents,
                    upcomingEvents: res.data.upcomingEvents,
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
        }
    }
)

export const adminEditEvent = createAsyncThunk(
    'adminEvents/editEvent',
    async ({ eventId, formData }: { eventId: string; formData: FormData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/editEvent/${eventId}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return {
                eventId,
                updatedEvent: res.data.data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update event");
        }
    }
)

export const adminDeleteEvent = createAsyncThunk(
    'adminEvents/delete',
    async (eventId: string, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/event/${eventId}`,
                { withCredentials: true }
            );

            return eventId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete event!");
        }
    }
)

const adminEventSlice = createSlice({
    name: 'adminEvents',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.success = null;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ status?: string; category?: string }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.filters = { status: 'all', category: 'all' };
            state.pagination.currentPage = 1;
        },
        setEditingEvent: (state, action: PayloadAction<EventData | null>) => {
            state.editingEvent = action.payload;
        },
        clearEditState: (state) => {
            state.editingEvent = null;
            state.editLoading = false;
            state.editError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminAddEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(adminAddEvent.fulfilled, (state, action: PayloadAction<EventData>) => {
                state.loading = false;
                state.success = "Event created successfully!";
                state.events.push(action.payload);
            })
            .addCase(adminAddEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch ALl Events
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
                    ongoingEvents: action.payload.pagination.ongoingEvents,
                    completedEvents: action.payload.pagination.completedEvents,
                    upcomingEvents: action.payload.pagination.upcomingEvents,
                };
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit Event
            .addCase(adminEditEvent.pending, (state) => {
                state.editLoading = true;
                state.editError = null;
                state.success = null;
            })
            .addCase(adminEditEvent.fulfilled, (state, action) => {
                state.editLoading = false;
                state.success = "Event updated successfully!";
                state.editingEvent = null;
                const index = state.events.findIndex(event => event._id === action.payload.eventId);
                if (index !== -1 && action.payload.updatedEvent) {
                    state.events[index] = action.payload.updatedEvent;
                }
            })
            .addCase(adminEditEvent.rejected, (state, action) => {
                state.editLoading = false;
                state.editError = action.payload as string;
            })

            // Delete Event
            .addCase(adminDeleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter((e) => e._id !== action.payload);
            })
            .addCase(adminDeleteEvent.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    },
});

export const { clearMessages, setSearch, setFilters, setPage, clearFilters, clearEditState, setEditingEvent } = adminEventSlice.actions;
export default adminEventSlice.reducer;