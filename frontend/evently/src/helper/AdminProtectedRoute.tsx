import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";
import LoadingSpinner from "../components/user/ShimmerUI/loadingSpinner";

const AdminProtectedRoute: React.FC = () => {
    const { admin, loading } = useSelector((state: RootState) => state.adminAuth);

    if (loading) {
        return <LoadingSpinner />
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
