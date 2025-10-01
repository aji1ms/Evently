import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import adminAuthReducer from "./slices/admin/adminAuthSlice";
import adminUsersReducer from "./slices/admin/adminUsersSlice";
import adminCategorySlice from "./slices/admin/adminCategorySlice";
import adminNotificationSlice from "./slices/admin/adminNotificationSlice";

const store = configureStore({
    reducer: {
        // ADMIN 
        adminAuth: adminAuthReducer,
        adminUsers: adminUsersReducer,
        adminCategories: adminCategorySlice,
        adminNotifications: adminNotificationSlice,

        // AUTH
        auth: authReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;