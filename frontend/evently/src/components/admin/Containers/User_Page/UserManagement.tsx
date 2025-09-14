import React from 'react';
import { Users, UserX, Download } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import SearchAndFilters from './SearchAndFilters';
import UserTable from './UserTable';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    joinedDate: string;
    lastActive: string;
    status: 'active' | 'blocked';
    role: 'user' | 'admin';
    totalBookings: number;
    totalSpent: number;
    avatar: string;
}

const UserManagement: React.FC = () => {
    const mockUsers: User[] = [
        {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567',
            location: 'New York, NY',
            joinedDate: '2023-01-15',
            lastActive: '2024-09-10',
            status: 'active',
            role: 'user',
            totalBookings: 12,
            totalSpent: 2450,
            avatar: 'JS'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 987-6543',
            location: 'Los Angeles, CA',
            joinedDate: '2023-03-22',
            lastActive: '2024-09-12',
            status: 'active',
            role: 'user',
            totalBookings: 8,
            totalSpent: 1200,
            avatar: 'SJ'
        },
        {
            id: '3',
            name: 'Michael Brown',
            email: 'mike.brown@email.com',
            phone: '+1 (555) 456-7890',
            location: 'Chicago, IL',
            joinedDate: '2023-05-10',
            lastActive: '2024-08-25',
            status: 'blocked',
            role: 'user',
            totalBookings: 3,
            totalSpent: 450,
            avatar: 'MB'
        },
        {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@email.com',
            phone: '+1 (555) 321-0987',
            location: 'Miami, FL',
            joinedDate: '2023-07-18',
            lastActive: '2024-09-11',
            status: 'active',
            role: 'user',
            totalBookings: 15,
            totalSpent: 3200,
            avatar: 'ED'
        },
    ]
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
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center">
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
                        value="100"
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Blocked Users"
                        value="10"
                        icon={<UserX className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Search and Filters */}
                <SearchAndFilters />

                {/* Users Table */}
                <UserTable mockUsers={mockUsers} />
            </div>
        </div>
    );
};

export default UserManagement;