import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    _id: string;
    avatar: string;
    name: string;
    email: string;
    phone?: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: { name: string; email: string; phone: string; password: string }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                data
            );

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                { email: data.email, password: data.password },
                { withCredentials: true }
            );

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/getUser`,
                { withCredentials: true }
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                credentials,
                { withCredentials: true }
            );

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/getUser`,
                { withCredentials: true }
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
)

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/getUser`,
                { withCredentials: true }
            );
            return res.data as User;
        } catch (err) {
            return rejectWithValue(null);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "auth/update",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile!");
        }
    }
)

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (idToken: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/google-signin`,
                { idToken },
                { withCredentials: true }
            );

            return res.data.user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Google login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Google Login
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;