import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { EventData } from "./adminEventSlice";

export interface BookingData {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    event: EventData;
    totalQuantity: number;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
    bookingDate: string;
    createdAt: string;
}

interface AdminBookingsState {
    bookings: BookingData[];
    currentTicket: BookingData | null;
    loading: boolean;
    error: string | null;
    stats: {
        totalBookings: number;
        totalTicketsSold: number;
        totalRevenue: number;
    }
    search: string;
    filters: { dateFilter: string };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }
}

const initialState: AdminBookingsState = {
    bookings: [],
    currentTicket: null,
    loading: false,
    error: null,
    stats: {
        totalBookings: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    },
    search: '',
    filters: {
        dateFilter: '',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
    }
};

export const fetchAdminBookings = createAsyncThunk(
    "adminBookings/fetchBookings",
    async (params: {
        search?: string;
        dateFilter?: string;
        page?: number;
    }, { rejectWithValue }) => {
        try {

            const { search, dateFilter, page = 1 } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (dateFilter && dateFilter !== '') queryParams.append('dateFilter', dateFilter);
            queryParams.append('page', String(page));
            queryParams.append('limit', '5');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/bookings?${queryParams}`,
                { withCredentials: true }
            );

            return {
                bookings: res.data.data,
                stats: {
                    totalBookings: res.data.totalBookings,
                    totalTicketsSold: res.data.totalTicketsSold || 0,
                    totalRevenue: res.data.totalRevenue || 0,
                },
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalCount: res.data.totalCount,
                    hasNextPage: res.data.hasNextPage,
                    hasPrevPage: res.data.hasPrevPage,
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings!");
        }
    }
);

export const getBookingDetails = createAsyncThunk(
    'admin/bookingDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/bookings/${id}`,
                { withCredentials: true }
            )
            console.log(res.data)
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings details!");
        }
    }
)

const adminBookingsSlice = createSlice({
    name: "adminBookings",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
            state.pagination.currentPage = 1;
        },
        setDateFilter: (state, action) => {
            state.filters.dateFilter = action.payload.dateFilter;
            state.pagination.currentPage = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.filters.dateFilter = '';
            state.pagination.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bookings
            .addCase(fetchAdminBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.bookings;
                state.stats = action.payload.stats;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAdminBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //Booking Details
            .addCase(getBookingDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookingDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTicket = action.payload;
            })
            .addCase(getBookingDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { setSearch, setDateFilter, clearFilters, setPage } = adminBookingsSlice.actions;
export default adminBookingsSlice.reducer;