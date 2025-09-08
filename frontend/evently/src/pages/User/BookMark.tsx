import React from 'react';
import { Bookmark, Calendar, MapPin, Clock, Users } from 'lucide-react';
import Header from '../../components/user/Containers/Header';
import Footer from '../../components/user/Containers/Footer';
import { useNavigate } from 'react-router';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
    attendees: number;
    image: string;
    isBookmarked: boolean;
}

const BookMark: React.FC = () => {
    const navigate = useNavigate();

    const events: Event[] = [
        {
            id: '1',
            title: 'Summer Music Festival 2025',
            date: '2025-07-15',
            time: '18:00',
            location: 'Central Park, New York',
            description: 'Join us for an amazing evening of live music featuring top artists from around the world.',
            category: 'Online',
            attendees: 1250,
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop',
            isBookmarked: true
        },
        {
            id: '2',
            title: 'Tech Conference 2025',
            date: '2025-09-20',
            time: '09:00',
            location: 'Convention Center, San Francisco',
            description: 'Discover the latest innovations in technology and network with industry leaders.',
            category: 'Offline',
            attendees: 800,
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
            isBookmarked: true
        },
        {
            id: '3',
            title: 'Art Gallery Opening',
            date: '2025-08-05',
            time: '19:30',
            location: 'Modern Art Museum, Los Angeles',
            description: 'Experience contemporary art from emerging and established artists.',
            category: 'Online',
            attendees: 200,
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
            isBookmarked: true
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                {/* Event Image */}
                                <div className="relative">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                                    >
                                        <Bookmark
                                            className={`w-5 h-5 ${event.isBookmarked ? 'text-red-500 fill-red-500' : 'text-gray-400'
                                                }`}
                                        />
                                    </button>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                            {formatDate(event.date)}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                                            {event.time}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                            {event.location}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                                            <span className="text-sm text-gray-600">{event.attendees} attending</span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        onClick={() => navigate(`/events/${event.id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No bookmarked events</h3>
                        <p className="text-gray-600">Start exploring events and bookmark your favorites!</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BookMark;