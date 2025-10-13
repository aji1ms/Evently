import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IReviewData {
    name: string;
    comment: string;
    rating: number;
    user?: string;
}

interface ReviewState {
    review: IReviewData | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    review: null,
    loading: false,
    error: null,
}

export const createReview = createAsyncThunk(
    "auth/review",
    async (reviewData: { name: string; rating: number; comment: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/createReview`,
                reviewData,
                { withCredentials: true }
            )

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "create review failed!")
        }
    }
)

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.review = action.payload;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default reviewSlice.reducer;