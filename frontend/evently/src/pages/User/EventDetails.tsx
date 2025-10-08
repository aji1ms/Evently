import { useEffect } from 'react';
import { Calendar, MapPin, Users, Video, Clock } from 'lucide-react';
import Header from '../../components/user/Containers/Header';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../Redux/store';
import { getEventDetails } from '../../Redux/slices/auth/authEventsSlice';
import Footer from '../../components/user/Containers/Footer';
import EventDetailsShimmer from '../../components/user/ShimmerUI/EventDetailsShimmer';

const EventDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { eventDetails, loading } = useSelector((state: RootState) => state.authEvents)

    useEffect(() => {
        if (id) {
            dispatch(getEventDetails(id))
        }
    }, [dispatch, id]);

    if (loading) {
        return <EventDetailsShimmer />;
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Date TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const calculateDiscount = () => {
        if (!eventDetails?.regularPrice || !eventDetails?.salePrice) return 0;
        return Math.round(((eventDetails.regularPrice - eventDetails.salePrice) / eventDetails.regularPrice) * 100);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Event Type Badge */}
                <div className="mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border ${eventDetails?.eventType === 'online'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                        {eventDetails?.eventType === 'online' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                        {eventDetails?.eventType === 'online' ? 'Online Event' : 'In-Person Event'}
                    </span>
                </div>

                {/* Title Section */}
                <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {eventDetails?.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Organized by <strong className="text-gray-900 font-medium">{eventDetails?.organizer}</strong></span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {(eventDetails?.totalSeats || 0) - (eventDetails?.availableSeats || 0)} attendees
                        </span>
                    </div>
                </div>

                {/* Event Image */}
                <div className="mb-12 rounded-2xl overflow-hidden bg-gray-100" style={{ aspectRatio: '474/214' }}>
                    <img
                        src={eventDetails?.image}
                        alt={eventDetails?.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this event</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed text-base">
                                    {eventDetails?.description}
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Join this event to gain valuable insights, connect with like-minded individuals,
                                    and acquire practical knowledge that you can apply immediately. Whether you're
                                    looking to learn new skills, network with professionals, or explore new opportunities,
                                    this event offers something for everyone.
                                </p>
                            </div>
                        </div>

                        {/* Event Details Grid */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Details</h2>
                            <div className="space-y-6">
                                {/* Date & Time */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                                        <p className="text-gray-900 font-medium">{formatDate(eventDetails?.eventDate)}</p>
                                        <p className="text-gray-600 text-sm flex items-center gap-1.5 mt-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {eventDetails?.eventTime}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        {eventDetails?.eventType === 'online' ? (
                                            <Video className="w-5 h-5 text-gray-700" />
                                        ) : (
                                            <MapPin className="w-5 h-5 text-gray-700" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Location</p>
                                        {eventDetails?.eventType === 'online' ? (
                                            <>
                                                <p className="text-gray-900 font-medium">Online Event</p>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Join from anywhere • Link shared via email
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-gray-900 font-medium">
                                                    {eventDetails?.location?.venue || 'Venue TBA'}
                                                </p>
                                                {eventDetails?.location?.address && (
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {eventDetails.location.address}
                                                    </p>
                                                )}
                                                {(eventDetails?.location?.city || eventDetails?.location?.state) && (
                                                    <p className="text-gray-600 text-sm">
                                                        {[eventDetails?.location?.city, eventDetails?.location?.state]
                                                            .filter(Boolean)
                                                            .join(', ')}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b border-gray-200">
                                    <div className="mb-4">
                                        {eventDetails?.regularPrice && eventDetails?.salePrice &&
                                            eventDetails.regularPrice > eventDetails.salePrice ? (
                                            <>
                                                <div className="flex items-baseline gap-3 mb-2">
                                                    <span className="text-3xl font-bold text-gray-900">
                                                        ${eventDetails.salePrice}
                                                    </span>
                                                    <span className="text-lg text-gray-400 line-through">
                                                        ${eventDetails.regularPrice}
                                                    </span>
                                                </div>
                                                <div className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
                                                    Save {calculateDiscount()}%
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    ${eventDetails?.salePrice || eventDetails?.regularPrice || 0}
                                                </span>
                                                <span className="text-sm text-gray-500">per ticket</span>
                                            </div>
                                        )}
                                    </div>

                                    {eventDetails?.availableSeats !== undefined && eventDetails.availableSeats > 0 && (
                                        <p className="text-sm text-gray-600">
                                            {eventDetails.availableSeats} {eventDetails.availableSeats === 1 ? 'ticket' : 'tickets'} remaining
                                        </p>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <div className="p-6">
                                    <button
                                        className="w-full bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors mb-3"
                                        disabled={eventDetails?.availableSeats === 0}
                                    >
                                        {eventDetails?.availableSeats === 0 ? 'Sold Out' : 'Get Tickets'}
                                    </button>
                                </div>
                            </div>

                            {/* Organizer Card */}
                            <div className="mt-6 p-6 border border-gray-200 rounded-2xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Organized by</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {eventDetails?.organizer?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{eventDetails?.organizer}</h4>
                                        <p className="text-gray-500 text-xs">Event Host</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetails;