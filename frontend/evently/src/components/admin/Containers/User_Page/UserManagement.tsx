// UserManagement.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { createUserByAdmin, fetchAllUsers } from '../../../../Redux/slices/admin/adminUsersSlice';
import { Users, UserX } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import SearchAndFilters from './SearchAndFilters';
import UserTable from './UserTable';
import AddUserModal, { type UserFormData } from '../../../user/Inputs/AddUserModal';
import Pagination from './Pagination';
import toast from 'react-hot-toast';

const UserManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, pagination } = useSelector((state: RootState) => state.adminUsers);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAllUsers({}));
    }, [dispatch]);

    const handleAddUser = async (userData: UserFormData) => {
        try {
            await dispatch(createUserByAdmin(userData)).unwrap();
            toast.success(`User created successfully!`, { duration: 2000 });
            dispatch(fetchAllUsers({}));
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error, { duration: 2000 });
        }
    }

    return (
        <div className="flex-1 min-h-screen bg-gray-50 p-6 md:ml-80">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                            <p className="text-gray-600 mt-2">Manage and monitor all user accounts</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Add User
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Users"
                        value={pagination.totalUsers || 0}
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Active Users"
                        value={pagination?.activeUsers || 0}
                        icon={<UserX className="w-6 h-6 text-green-600" />}
                    />

                    <StatsCard
                        title="Blocked Users"
                        value={pagination?.inactiveUsers || 0}
                        icon={<UserX className="w-6 h-6 text-red-600" />}
                    />
                </div>

                {/* Search and Filters */}
                <SearchAndFilters />

                {/* Users Table */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading users...</p>
                    </div>
                ) : (
                    <>
                        <UserTable userDatas={users} />
                        <Pagination />
                    </>
                )}
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddUser}
            />
        </div>
    );
};

export default UserManagement;