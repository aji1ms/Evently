import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { EventData } from "./authEventsSlice";

export interface TicketsData {
    _id: string;
    event: EventData;
    totalQuantity: number;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
    bookingDate: string;
    ticketId: string;
    createdAt: string;
}

interface TicketState {
    tickets: TicketsData[];
    currentTicket: TicketsData | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalTickets: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const initialState: TicketState = {
    tickets: [],
    currentTicket: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalTickets: 0,
    hasNextPage: false,
    hasPrevPage: false
}


export const fetchTickets = createAsyncThunk(
    "auth/tickets",
    async (page: number = 1, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/bookings?page=${page}&limit=3`,
                { withCredentials: true }
            )

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ticket feching failed!");
        }
    }
)

export const getTicketDetails = createAsyncThunk(
    "auth/ticketDetails",
    async (ticketId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/booking/${ticketId}`,
                { withCredentials: true }
            )

            return res.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ticket details feching failed!");
        }
    }
)

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tickets
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload.data;
                state.currentPage = action.payload.currentPage || 1;
                state.totalPages = action.payload.totalPages || 1;
                state.totalTickets = action.payload.totalTickets || 0;
                state.hasNextPage = action.payload.hasNextPage || false;
                state.hasPrevPage = action.payload.hasPrevPage || false;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Ticket Details
            .addCase(getTicketDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTicketDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTicket = action.payload;
            })
            .addCase(getTicketDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { setCurrentPage } = ticketSlice.actions;
export default ticketSlice.reducer;