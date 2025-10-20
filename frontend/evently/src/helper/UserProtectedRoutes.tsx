import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";
import LoadingSpinner from "../components/user/ShimmerUI/LoadingSpinner";

const UserProtectedRoutes: React.FC = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default UserProtectedRoutes;
