import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";
import toast from "react-hot-toast";

const AdminProtectedRoute: React.FC = () => {
    const admin = useSelector((state: RootState) => state.adminAuth.admin);

    if (!admin) {
        toast.error("Please Login!", { duration: 2000 });
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
