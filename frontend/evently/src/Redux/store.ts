import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin/adminAuthSlice";
import adminUsersReducer from "./slices/admin/adminUsersSlice";
import adminCategorySlice from "./slices/admin/adminCategorySlice";
import adminNotificationSlice from "./slices/admin/adminNotificationSlice";
import adminEventSlice from "./slices/admin/adminEventSlice";
import authReducer from "./slices/auth/authSlice";
import authEventsReducer from "./slices/auth/authEventsSlice";
import authBookmarksReducer from "./slices/auth/authBookmarkSlice";
import authBookingReducer from "./slices/auth/authBookingSlice";

const store = configureStore({
    reducer: {
        // ADMIN 
        adminAuth: adminAuthReducer,
        adminUsers: adminUsersReducer,
        adminCategories: adminCategorySlice,
        adminNotifications: adminNotificationSlice,
        adminEvents: adminEventSlice,

        // AUTH
        auth: authReducer,
        authEvents: authEventsReducer,
        authBookmarks: authBookmarksReducer,
        authBookings: authBookingReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;