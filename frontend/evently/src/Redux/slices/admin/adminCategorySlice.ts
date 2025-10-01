import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
}

interface AdminCategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    search: string;
    filters: { status: string };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCategories: number;
        hasNext: boolean;
        hasPrev: boolean;
        activeCategories?: number;
        inactiveCategories?: number;
    }
}

const initialState: AdminCategoryState = {
    categories: [],
    loading: false,
    error: null,
    search: '',
    filters: {
        status: 'all',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCategories: 0,
        hasNext: false,
        hasPrev: false,
        activeCategories: 0,
        inactiveCategories: 0,
    }
}

export const fetchAllCategories = createAsyncThunk(
    "adminCategory/fetchAll",
    async (params: {
        search?: string;
        status?: string;
        page?: number;
    } = {}, { rejectWithValue }) => {
        try {

            const { search, status, page } = params;

            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (status && status !== 'all') queryParams.append('status', status);
            if (page) queryParams.append('page', page.toString());
            queryParams.append("limit", '5');

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/categories?${queryParams}`,
                { withCredentials: true }
            );

            return {
                categories: res.data.data,
                pagination: {
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalCategories: res.data.totalCategories,
                    hasNext: res.data.hasNext,
                    hasPrev: res.data.hasPrev,
                    activeCategories: res.data.activeCategories,
                    inactiveCategories: res.data.inactiveCategories,
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
);

export const createCategory = createAsyncThunk(
    "adminCategory/createCategory",
    async (data: { name: string; description: string; }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/addCategory`,
                data,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create category");
        }
    }
);

export const editCategoryStatus = createAsyncThunk(
    "adminCategory/editStatus",
    async ({ categoryId, isActive }: { categoryId: string; isActive: boolean }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/categoryStatus/${categoryId}`,
                { isActive },
                { withCredentials: true }
            );
            return res.data.data as Category;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update category");
        }
    }
);

export const editCategoryData = createAsyncThunk(
    "adminCategory/editData",
    async ({ categoryId, name, description }: { categoryId: string, name: string, description: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/editCategory/${categoryId}`,
                { name, description },
                { withCredentials: true }
            );

            return res.data.data as Category;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to edit category");
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "adminCategory/delete",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteCategory/${categoryId}`,
                { withCredentials: true }
            )
            return categoryId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete category");
        }
    }
)

const adminCategorySlice = createSlice({
    name: "adminCategories",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ status?: string }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.filters = { status: 'all' };
            state.pagination.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.pagination = {
                    currentPage: action.payload.pagination.currentPage,
                    totalPages: action.payload.pagination.totalPages,
                    totalCategories: action.payload.pagination.totalCategories,
                    hasNext: action.payload.pagination.hasNext,
                    hasPrev: action.payload.pagination.hasPrev,
                    activeCategories: action.payload.pagination.activeCategories,
                    inactiveCategories: action.payload.pagination.inactiveCategories,
                };
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit Status
            .addCase(editCategoryStatus.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.categories[index] = action.payload;
            })
            .addCase(editCategoryStatus.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((cat) => cat._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Edit Category
            .addCase(editCategoryData.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.categories[index] = action.payload
            })
            .addCase(editCategoryData.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
});

export const { setSearch, setFilters, setPage, clearFilters } = adminCategorySlice.actions;
export default adminCategorySlice.reducer;