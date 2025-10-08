import { FaRegBookmark, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaVideo, FaBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useEffect } from "react";
import { fetchAllEvents } from "../../Redux/slices/auth/authEventsSlice";
import EventShimmer from "../../components/user/ShimmerUI/eventShimmer";


const AllEvents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, filters, search, pagination } = useSelector((state: RootState) => state.authEvents);

    useEffect(() => {
        dispatch(fetchAllEvents({
            search,
            type: filters.type,
            category: filters.category,
            page: pagination.currentPage
        }));
    }, [search, filters, pagination.currentPage, dispatch]);

    if (loading) {
        return <EventShimmer />
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        < div className="px-4 lg:px-8 py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50" >
            <div className="max-w-6xl mx-auto">
                {events.length > 0 ? (
                    <div className="space-y-6">
                        {events.map(event => (
                            <div
                                key={event?._id}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                            >
                                <div className="relative p-8">
                                    <div className="flex flex-col lg:flex-row items-center gap-8">

                                        {/* image section */}
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                            <img
                                                src={event?.image}
                                                alt={event?.title}
                                                className="relative w-40 h-32 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* event type badge */}
                                            <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${event?.eventType === 'online'
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                }`}>
                                                {event?.eventType === 'online' ? <FaVideo className="inline mr-1" /> : <FaBuilding className="inline mr-1" />}
                                                {event?.eventType.toUpperCase()}
                                            </div>
                                        </div>

                                        {/* content section */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                                    {event?.title}
                                                </h2>
                                                <p className="text-gray-600 text-lg mt-2">
                                                    <span className="font-medium">Organized by</span>
                                                    <span className="ml-2 text-blue-600 font-semibold">{event?.organizer}</span>
                                                </p>
                                            </div>

                                            {/* event details */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                    <FaCalendarAlt className="text-blue-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-medium">Date</p>
                                                        <p className="text-gray-800 font-semibold"> {formatDate(event?.eventDate)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                    <FaClock className="text-green-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-medium">Time</p>
                                                        <p className="text-gray-800 font-semibold">{event?.eventTime}</p>
                                                    </div>
                                                </div>

                                                {event?.location?.venue ? (
                                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                        <FaMapMarkerAlt className="text-red-500 text-lg" />
                                                        <div>
                                                            <p className="text-xs text-gray-500 uppercase font-medium">Venue</p>
                                                            <p className="text-gray-800 font-semibold">{event?.location?.venue}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                        <FaVideo className="text-purple-500 text-lg" />
                                                        <div>
                                                            <p className="text-xs text-gray-500 uppercase font-medium">Platform</p>
                                                            <p className="text-gray-800 font-semibold">Online Event</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* bottom */}
                                            <div className="flex items-center justify-between pt-4">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <FaUsers className="text-blue-500" />
                                                    <span className="font-medium">{event?.totalSeats - event?.availableSeats} people enrolled</span>
                                                </div>

                                                <button className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
                                                    onClick={() => navigate(`/events/${event?._id}`)}
                                                >
                                                    <span className="relative z-10">View Details</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* bookmark */}
                                        <button
                                            className="absolute top-6 right-6 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                        >
                                            <FaRegBookmark className="text-gray-400 hover:text-yellow-500 text-xl transition-colors duration-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">No events available</h3>
                        <p className="text-gray-500">Check back later for exciting upcoming events!</p>
                    </div>
                )}
            </div>
        </div >

    );
};

export default AllEvents;