import { createSlice, createAsyncThunk, type PayloadAction, } from "@reduxjs/toolkit";
import axios from "axios";

export interface ReviewData {
    _id: string;
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    name: string;
    comment: string;
    rating: number;
    createdAt: string;
}

interface AdminReviewState {
    reviews: ReviewData[];
    loading: boolean;
    error: string | null;
    filters: {
        dateFilter: string,
        rating: string
    }
    stats: {
        totalReviews: number;
        averageRating: number;
        fiveStarCount: number;
    }
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }
}

const initialState: AdminReviewState = {
    reviews: [],
    loading: false,
    error: null,
    filters: {
        dateFilter: "all",
        rating: "all"
    },
    stats: {
        totalReviews: 0,
        averageRating: 0,
        fiveStarCount: 0,
    },
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false
    }
}

export const fetchReviews = createAsyncThunk(
    "admin/reviews",
    async (params: {
        dateFilter?: string;
        rating?: string;
        page?: number;
    }, { rejectWithValue }) => {
        try {

            const { dateFilter, rating, page = 1 } = params;

            const queryParams = new URLSearchParams();
            if (dateFilter && dateFilter !== 'all') queryParams.append('dateFilter', dateFilter);
            if (rating && rating !== 'all') queryParams.append('rating', rating);
            queryParams.append('page', String(page));
            queryParams.append('limit', '5');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews?${queryParams}`,
                { withCredentials: true }
            );

            return {
                reviews: res.data.data,
                stats: {
                    totalReviews: res.data.totalReviews,
                    averageRating: res.data.averageRating,
                    fiveStarCount: res.data.fiveStarCount,
                },
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalCount: res.data.totalCount,
                    hasNextPage: res.data.hasNextPage,
                    hasPrevPage: res.data.hasPrevPage,
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews!");
        }
    }
);

export const deleteReview = createAsyncThunk(
    "admin/deleteReview",
    async (reviewId: string, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteReview/${reviewId}`,
                { withCredentials: true }
            )

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete review!");
        }
    }
)

const adminReviewSlice = createSlice({
    name: "adminReviews",
    initialState,
    reducers: {
        setRating: (state, action) => {
            state.filters.rating = action.payload;
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
            state.filters.rating = 'all';
            state.filters.dateFilter = 'all';
            state.pagination.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Reviews
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;
                state.stats = action.payload.stats;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Review
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter((r) => r._id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
})

export const { setRating, setDateFilter, clearFilters, setPage } = adminReviewSlice.actions;
export default adminReviewSlice.reducer;