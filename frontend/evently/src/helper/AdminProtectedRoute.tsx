import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";

const AdminProtectedRoute: React.FC = () => {
    const admin = useSelector((state: RootState) => state.adminAuth.admin);

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
