import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";

const UserProtectedRoutes: React.FC = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Checking login...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default UserProtectedRoutes;
