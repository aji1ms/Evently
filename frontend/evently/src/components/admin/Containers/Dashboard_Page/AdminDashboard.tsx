import React from 'react';
import { Calendar, Users, Ticket, DollarSign } from 'lucide-react';
import BestSelling from './BestSelling';
import SalesOverview from './SalesOverview';
import StatsCard from './StatsCard';

const AdminDashboard: React.FC = () => {

    const stats = {
        totalEvents: 156,
        totalUsers: 2847,
        totalBookings: 1923,
        totalRevenue: 45670,
        monthlyRevenue: 12450,
        weeklyBookings: 287
    };

    return (
        <div className="flex-1 bg-gray-50 p-4 w-full">
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
                        value={stats.totalEvents}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                        change="+12% from last month"
                        changeType="positive"
                    />

                    <StatsCard
                        title="Total Users Registered"
                        value={stats.totalUsers}
                        icon={<Users className="w-6 h-6 text-green-600" />}
                        change="+8.5% from last month"
                        changeType="positive"
                    />

                    <StatsCard
                        title="Total Tickets Sold"
                        value={stats.totalBookings}
                        icon={<Ticket className="w-6 h-6 text-purple-600" />}
                        change="-15.3% from last month"
                        changeType="negative"
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={`$${stats.totalRevenue}`}
                        icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                        change="+22.1% from last month"
                        changeType="neutral"
                    />
                </div>

                {/* Best Selling Table and Sales Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <BestSelling />
                    <SalesOverview />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;