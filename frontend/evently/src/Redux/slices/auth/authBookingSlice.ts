// slices/auth/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface BookingData {
    _id: string;
    user: string;
    event: string;
    totalQuantity: number;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    transactionId?: string;
    createdAt: string;
}

interface BookingState {
    booking: BookingData | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    booking: null,
    loading: false,
    error: null,
};

export const createPayPalBooking = createAsyncThunk(
    'booking/createPayPalBooking',
    async (bookingData: {
        eventId: string;
        quantity: number;
        transactionId: string;
    }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/checkout`,
                bookingData,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Booking creation failed");
        }
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPayPalBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayPalBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload;
            })
            .addCase(createPayPalBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default bookingSlice.reducer;