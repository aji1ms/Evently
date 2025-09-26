import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";
import toast from "react-hot-toast";

const UserProtectedRoutes: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        toast.error("Please login to access this page!", { duration: 2000 });
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default UserProtectedRoutes;
