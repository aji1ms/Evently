import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserGrowth {
    month: string
    users: number
    newUsers: number
}

export interface EventPopularity {
    name: string
    bookings: number
    capacity: number
}

export interface BookingTrend {
    week: string
    bookings: number
}

export interface RevenueBreakdown {
    name: string
    value: number
    color: string
}

export interface MostAttendedEvent {
    name: string
    attendees: number
    revenue: number
    date: string
}

export interface ReportData {
    totalUsers: number
    totalRevenue: number
    totalBookings: number
    totalEvents: number
    userGrowth: UserGrowth[]
    eventPopularity: EventPopularity[]
    bookingTrends: BookingTrend[]
    revenueBreakdown: RevenueBreakdown[]
    mostAttendedEvents: MostAttendedEvent[]
}

interface ReportState {
    report: ReportData | null;
    loading: boolean;
    error: string | null
}

const initialState: ReportState = {
    report: null,
    loading: false,
    error: null,
}

export const fetchAdminReport = createAsyncThunk(
    "admin/reports",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/reports`,
                { withCredentials: true }
            )

            return {
                totalUsers: res?.data?.totals?.totalUsers,
                totalRevenue: res?.data?.totals?.totalRevenue,
                totalBookings: res?.data?.totals?.totalBookings,
                totalEvents: res?.data?.totals?.totalEvents,
                userGrowth: res?.data?.userGrowth,
                eventPopularity: res?.data?.eventPopularity,
                bookingTrends: res?.data?.bookingTrends,
                revenueBreakdown: res?.data?.revenueBreakdown,
                mostAttendedEvents: res?.data?.mostAttendedEvents
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews!");
        }
    }
)

const adminReportSlice = createSlice({
    name: 'adminReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
            })
            .addCase(fetchAdminReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export default adminReportSlice.reducer