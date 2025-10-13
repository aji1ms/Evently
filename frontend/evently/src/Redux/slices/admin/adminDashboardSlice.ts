import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface BestSellingEvent {
    name: string;
    price: number;
    sold: number;
    revenue: number;
}

export interface SaleData  {
    name: string;
    sales: number;
    revenue: number;
}

export interface SalesOverviewData {
    weekly: SaleData [];
    monthly: SaleData [];
    yearly: SaleData [];
}

export interface DashboardData {
    totalUsers: number
    totalRevenue: number
    totalBookings: number
    totalEvents: number
    bestSellingEvents: BestSellingEvent[];
    salesOverview: SalesOverviewData;
}

interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchAdminDashboard = createAsyncThunk(
    "admin/dashboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
                { withCredentials: true }
            );

            return {
                totalUsers: res?.data?.stats?.totalUsers,
                totalRevenue: res?.data?.stats?.totalRevenue,
                totalBookings: res?.data?.stats?.totalBookings,
                totalEvents: res?.data?.stats?.totalEvents,
                bestSellingEvents: res?.data?.bestSellingEvents,
                salesOverview: res?.data?.salesOverview,
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data!");
        }
    }
);

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export default adminDashboardSlice.reducer