import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    isBlocked: boolean;
    avatar: string;
    role: string;
    authSource: string;
    bookings: [string];
}

interface AdminUsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    search: string;
    filters: {
        status: string;
        role: string;
    };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalUsers: number;
        hasNext: boolean;
        hasPrev: boolean;
        activeUsers?: number;
        inactiveUsers?: number;
    }
}

const initialState: AdminUsersState = {
    users: [],
    loading: false,
    error: null,
    search: '',
    filters: {
        status: 'all',
        role: 'all'
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        hasNext: false,
        hasPrev: false,
        activeUsers: 0,
        inactiveUsers: 0,
    }
};

export const fetchAllUsers = createAsyncThunk(
    "adminUsers/fetchAll",
    async (params: {
        search?: string;
        status?: string;
        role?: string;
        page?: number;
    } = {}, { rejectWithValue }) => {
        try {

            const { search, status, role, page } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (status && status !== 'all') queryParams.append('status', status);
            if (role && role !== 'all') queryParams.append('role', role);
            if (page) queryParams.append('page', page.toString());
            queryParams.append('limit', '5');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users?${queryParams}`,
                { withCredentials: true }
            );

            return {
                users: res.data.data,
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalUsers: res.data.totalUsers,
                    hasNext: res.data.hasNext,
                    hasPrev: res.data.hasPrev,
                    activeUsers: res.data.activeUsers,
                    inactiveUsers: res.data.inactiveUsers,
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

export const createUserByAdmin = createAsyncThunk(
    "admin/createUser",
    async (data: { name: string; email: string; phone: string; password: string; }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                data,
                { withCredentials: true }
            );

            return res.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create user");
        }
    }
)

export const editUserStatus = createAsyncThunk(
    "adminUsers/editStatus",
    async ({ userId, isBlocked }: { userId: string; isBlocked: boolean }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/userStatus/${userId}`,
                { isBlocked },
                { withCredentials: true }
            );
            return res.data.data as User;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update status");
        }
    }
);

export const editUser = createAsyncThunk(
    "adminUsers/editUser",
    async ({ userId, isAdmin, role }: { userId: string; isAdmin: boolean; role: string }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/editUser/${userId}`,
                { isAdmin, role },
                { withCredentials: true }
            );
            return res.data.data as User;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update user admin status");
        }
    }
);

const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ status?: string; role?: string }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.filters = { status: 'all', role: 'all' };
            state.pagination.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = {
                    currentPage: action.payload.pagination.currentPage,
                    totalPages: action.payload.pagination.totalPages,
                    totalUsers: action.payload.pagination.totalUsers,
                    hasNext: action.payload.pagination.hasNext,
                    hasPrev: action.payload.pagination.hasPrev,
                    activeUsers: action.payload.pagination.activeUsers,
                    inactiveUsers: action.payload.pagination.inactiveUsers,
                };
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create User
            .addCase(createUserByAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserByAdmin.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUserByAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit Status
            .addCase(editUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.users[index] = action.payload;
            })
            .addCase(editUserStatus.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Edit User
            .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.users[index] = action.payload;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSearch, setFilters, setPage, clearFilters } = adminUserSlice.actions;
export default adminUserSlice.reducer;