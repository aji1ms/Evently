import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AdminAuthState {
    admin: Admin | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminAuthState = {
    admin: null,
    loading: false,
    error: null,
}

export const adminLogin = createAsyncThunk(
    "admin/login",
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
                credentials,
                { withCredentials: true }
            );

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAdmin`,
                { withCredentials: true }
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Admin login failed");
        }
    }
)

export const fetchAdmin = createAsyncThunk(
    "admin/fetchAdmin",
    async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAdmin`,
                { withCredentials: true }
            );
            return res.data.admin;
        } catch {
            return null;
        }
    }
);

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogout: (state) => {
            state.admin = null;
        },
        setAdmin: (state, action: PayloadAction<Admin | null>) => {
            state.admin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.admin = action.payload;
            })
    },
});

export const { adminLogout, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;