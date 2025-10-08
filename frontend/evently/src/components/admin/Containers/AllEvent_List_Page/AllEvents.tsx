import { TrendingUp } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import AllEventsGrid from './AllEventsGrid';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { useEffect } from 'react';
import { fetchAllEvents } from '../../../../Redux/slices/admin/adminEventSlice';
import EventSearchFilter from './EventSearchFilter';
import EventPagination from './EventPagination';


const AllEvents = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, pagination } = useSelector((state: RootState) => state.adminEvents);

    useEffect(() => {
        dispatch(fetchAllEvents({}))
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80 w-full">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
                    <p className="text-gray-600">Manage all your events </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title='Total Events'
                        icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
                        value={pagination?.totalEvents || 0}
                    />
                    <StatsCard
                        title='Upcoming Events'
                        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                        value={pagination?.upcomingEvents || 0}
                    />
                    <StatsCard
                        title='Ongoing Events'
                        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                        value={pagination?.ongoingEvents || 0}
                    />
                    <StatsCard
                        title='Completed Events'
                        icon={<TrendingUp className="w-6 h-6 text-red-600" />}
                        value={pagination?.completedEvents || 0}
                    />
                </div>

                <EventSearchFilter />

                {/* Events Grid */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading events...</p>
                    </div>
                ) : (
                    <>
                        < AllEventsGrid events={events} />
                        <EventPagination />
                    </>
                )}
            </div>
        </div>
    );
};

export default AllEvents;