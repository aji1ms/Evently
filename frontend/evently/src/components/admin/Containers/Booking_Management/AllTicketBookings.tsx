import { Ticket, DollarSign } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import SearchFilter from './SearchFilter';
import BookedList from './BookedList';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { useEffect } from 'react';
import { fetchAdminBookings } from '../../../../Redux/slices/admin/adminBookingSlice';
import BookingPagination from './BookingPagination';

const AllTicketBookings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, pagination, stats, search, filters } = useSelector((state: RootState) => state.adminBookings);

    useEffect(() => {
        dispatch(fetchAdminBookings({
            search: search,
            dateFilter: filters.dateFilter,
            page: pagination.currentPage
        }));
    }, [dispatch, search, filters.dateFilter, pagination.currentPage]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80 w-full">
            <div className="mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
                    <p className="text-gray-600">Manage all ticket bookings and details</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Booking"
                        value={stats?.totalBookings}
                        icon={<Ticket className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={`$${stats?.totalRevenue}`}
                        icon={<DollarSign className="w-6 h-6 text-green-600" />}
                    />

                    <StatsCard
                        title="Total Tickets Sold"
                        value={stats?.totalTicketsSold}
                        icon={<Ticket className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Filters */}

                <SearchFilter />

                {/* Bookings Table */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading bookings...</p>
                    </div>
                ) : (
                    <>
                        < BookedList booking={bookings} />
                        <BookingPagination />
                    </>
                )}
            </div>
        </div>
    );
};

export default AllTicketBookings;