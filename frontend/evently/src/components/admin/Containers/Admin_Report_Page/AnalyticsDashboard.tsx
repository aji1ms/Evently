import React, { useEffect } from 'react';
import { Users, Calendar, DollarSign, Ticket } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import UserGrowthChart from './UserGrowthChart';
import EventPopularityChart from './EventPopularityChart';
import BookingTrends from './BookingTrends';
import MostAttendedEvents from './MostAttendedEvents';
import RevenueBreakdownChart from './RevenueBreakdownChart';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchAdminReport } from '../../../../Redux/slices/admin/adminReportSlice';

const AnalyticsDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { report } = useSelector((state: RootState) => state.adminReport);

    useEffect(() => {
        dispatch(fetchAdminReport())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50 w-full p-6 md:ml-80">
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
                        value={report?.totalUsers || 0}
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                    />
                    <StatsCard
                        title="Total Events"
                        value={report?.totalEvents || 0}
                        icon={<Calendar className="w-6 h-6 text-green-600" />}
                    />
                    <StatsCard
                        title="Total Revenue"
                        value={`$${report?.totalRevenue}` || 0}
                        icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
                    />
                    <StatsCard
                        title="Total Bookings"
                        value={report?.totalBookings || 0}
                        icon={<Ticket className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <UserGrowthChart userData={report?.userGrowth} />
                    <EventPopularityChart eventData={report?.eventPopularity} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <BookingTrends bookingData={report?.bookingTrends} />
                    <RevenueBreakdownChart revenueData={report?.revenueBreakdown} />
                </div>
                <MostAttendedEvents eventTable={report?.mostAttendedEvents} />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;