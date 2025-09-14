import React from 'react';
import { Users, Calendar, DollarSign, Eye } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import UserGrowthChart from './UserGrowthChart';
import EventPopularityChart from './EventPopularityChart';
import BookingTrends from './BookingTrends';
import RevenueBreakdown from './RevenueBreakdown';
import MostAttendedEvent from './MostAttendedEvent';

const AnalyticsDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                            <p className="text-gray-600 mt-2">Track performance and insights of your platform</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Users"
                        value="2,450"
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                    />
                    <StatsCard
                        title="Active Events"
                        value="24"
                        icon={<Calendar className="w-6 h-6 text-green-600" />}
                    />
                    <StatsCard
                        title="Total Revenue"
                        value="$10000"
                        icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
                    />
                    <StatsCard
                        title="Total Bookings"
                        value="1,240"
                        icon={<Eye className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* User Growth Chart */}
                    <UserGrowthChart />

                    {/* Event Popularity Chart */}
                    <EventPopularityChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Booking Trends */}
                    <BookingTrends />

                    {/* Revenue Breakdown */}
                    <RevenueBreakdown />
                </div>

                {/* Most Attended Events Table */}
                <MostAttendedEvent />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;