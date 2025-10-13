import React, { useEffect } from 'react';
import { Calendar, Users, Ticket, DollarSign } from 'lucide-react';
import BestSelling from './BestSelling';
import SalesOverview from './SalesOverview';
import StatsCard from './StatsCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchAdminDashboard } from '../../../../Redux/slices/admin/adminDashboardSlice';

const AdminDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.adminDashboard)

    useEffect(() => {
        dispatch(fetchAdminDashboard());
    }, [dispatch])

    return (
        <div className="flex-1 bg-gray-50 p-4 w-full md:ml-80">
            <div className="w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Overview of platform performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Events Listed"
                        value={data?.totalEvents || 0}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Total Users"
                        value={data?.totalUsers || 0}
                        icon={<Users className="w-6 h-6 text-green-600" />}
                    />

                    <StatsCard
                        title="Total Tickets Sold"
                        value={data?.totalBookings || 0}
                        icon={<Ticket className="w-6 h-6 text-purple-600" />}
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={`$${data?.totalRevenue || 0}`}
                        icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                    />
                </div>

                {/* Best Selling Table and Sales Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <BestSelling bestSelling={data?.bestSellingEvents} />
                    <SalesOverview salesData={data?.salesOverview} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;