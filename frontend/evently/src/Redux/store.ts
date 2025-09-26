import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import adminAuthReducer from "./slices/admin/adminAuthSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;