import { useEffect } from 'react';
import { Bookmark, Calendar, MapPin, Clock, Users, Video, Building } from 'lucide-react';
import Header from '../../components/user/Containers/Header';
import Footer from '../../components/user/Containers/Footer';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../Redux/store';
import { getUserBookmarks, removeFromBookmark } from '../../Redux/slices/auth/authBookmarkSlice';
import toast from 'react-hot-toast';
import BookingPageShimmer from '../../components/user/ShimmerUI/BookingPageShimmer';

const BookMark = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { bookmarks, loading } = useSelector((state: RootState) => state.authBookmarks);

    useEffect(() => {
        dispatch(getUserBookmarks())
    }, [dispatch])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatLocation = (location: any) => {
        if (!location) return 'Location TBA';

        const parts = [
            location.venue,
            location.address,
            location.city
        ].filter(Boolean);

        return parts.length > 0 ? parts.join(', ') : 'Location TBA';
    };

    const handleRemoveBookmark = async (eventId: string) => {
        try {
            await dispatch(removeFromBookmark(eventId)).unwrap();
            toast.success("Event removed from bookmarks!", { duration: 2000 })
        } catch (error: any) {
            toast.error("Failed to remove bookmark", { duration: 2000 })
        }
    }

    if (loading) {
        return <BookingPageShimmer />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookmarks</h1>
                    <p className="text-gray-600 text-lg">Your saved events for quick access</p>
                </div>

                {/* Events Grid */}
                {bookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.map(bookmark => (
                            <div
                                key={bookmark?._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group"
                            >
                                {/* Event Image */}
                                <div className="relative">
                                    <img
                                        src={bookmark?.event?.image}
                                        alt={bookmark?.event?.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button
                                        onClick={() => handleRemoveBookmark(bookmark?.event?._id)}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                                        title="Remove from bookmarks"
                                    >
                                        <Bookmark className="w-5 h-5 text-red-500 fill-red-500" />
                                    </button>

                                    {/* Category Badge */}
                                    {bookmark?.event?.category?.name && (
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                {bookmark.event.category.name}
                                            </span>
                                        </div>
                                    )}

                                    {/* Event Type Badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bookmark?.event?.eventType === 'online'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {bookmark?.event?.eventType === 'online' ? (
                                                <Video className="w-3 h-3" />
                                            ) : (
                                                <Building className="w-3 h-3" />
                                            )}
                                            {bookmark?.event?.eventType?.charAt(0).toUpperCase() + bookmark?.event?.eventType?.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {bookmark?.event?.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {bookmark?.event?.description}
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                                            <span>{formatDate(bookmark?.event?.eventDate)}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                            <span>{bookmark?.event?.eventTime}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
                                            {bookmark?.event?.eventType === 'online' ? (
                                                <>
                                                    <Video className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                                                    <span>Online Event • Link shared via email</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                                                    <span className="line-clamp-1">{formatLocation(bookmark?.event?.location)}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Users className="w-4 h-4 mr-1" />
                                            <span>
                                                {bookmark?.event?.totalSeats - bookmark?.event?.availableSeats} attending
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            ${bookmark?.event?.salePrice}
                                        </div>
                                    </div>

                                    <button
                                        className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium hover:shadow-lg"
                                        onClick={() => navigate(`/events/${bookmark?.event?._id}`)}
                                    >
                                        View Event Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <Bookmark className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No bookmarked events yet</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Start exploring events and save your favorites for quick access later!
                        </p>
                        <button
                            onClick={() => navigate('/events')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Browse Events
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BookMark;