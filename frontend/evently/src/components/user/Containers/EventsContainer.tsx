import { FaRegBookmark, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaVideo, FaBuilding } from "react-icons/fa";

type EventType = "offline" | "online";
type Event = {
    id: string;
    title: string;
    conductedBy: string;
    type: EventType;
    count: number;
    details: {
        date: string;
        time: string;
        venue?: string;
    };
    image: string;
};

const events: Event[] = [
    {
        id: "1",
        title: "Hackthon",
        conductedBy: "Microsoft",
        type: "offline",
        count: 20,
        details: {
            date: "2025-09-10",
            time: "10:00",
            venue: "Techno Park"
        },
        image: "https://picsum.photos/200"
    },
    {
        id: "2",
        title: "AI Webinar",
        conductedBy: "Google",
        type: "online",
        count: 5,
        details: {
            date: "2025-08-10",
            time: "10:00",
        },
        image: "https://picsum.photos/200"
    },
    {
        id: "3",
        title: "Web Designing",
        conductedBy: "Brototype",
        type: "offline",
        count: 70,
        details: {
            date: "2025-09-10",
            time: "10:00",
            venue: "Brototype Hub"
        },
        image: "https://picsum.photos/200"
    },
];

const EventsContainer = () => {

    return (
        <div className="px-4 lg:px-8 py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                        Upcoming Events
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">Discover amazing events happening near you</p>
                </div>

                {events.length > 0 ? (
                    <div className="space-y-6">
                        {events.map(event => (
                            <div
                                key={event.id}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                            >
                                <div className="relative p-8">
                                    <div className="flex flex-col lg:flex-row items-center gap-8">

                                        {/* image section */}
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="relative w-40 h-32 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* event type badge */}
                                            <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${event.type === 'online'
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                }`}>
                                                {event.type === 'online' ? <FaVideo className="inline mr-1" /> : <FaBuilding className="inline mr-1" />}
                                                {event.type.toUpperCase()}
                                            </div>
                                        </div>

                                        {/* content section */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                                    {event.title}
                                                </h2>
                                                <p className="text-gray-600 text-lg">
                                                    <span className="font-medium">Organized by</span>
                                                    <span className="ml-2 text-blue-600 font-semibold">{event.conductedBy}</span>
                                                </p>
                                            </div>

                                            {/* event details */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                    <FaCalendarAlt className="text-blue-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-medium">Date</p>
                                                        <p className="text-gray-800 font-semibold">{event.details.date}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                    <FaClock className="text-green-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-medium">Time</p>
                                                        <p className="text-gray-800 font-semibold">{event.details.time}</p>
                                                    </div>
                                                </div>

                                                {event.details.venue ? (
                                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                                        <FaMapMarkerAlt className="text-red-500 text-lg" />
                                                        <div>
                                                            <p className="text-xs text-gray-500 uppercase font-medium">Venue</p>
                                                            <p className="text-gray-800 font-semibold">{event.details.venue}</p>
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
                                                    <span className="font-medium">{event.count} people enrolled</span>
                                                </div>

                                                <button className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200">
                                                    <span className="relative z-10">View Details</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
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

                {/* explore button */}
                <div className="flex justify-center mt-16">
                    <button className="group relative px-12 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-300">
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Explore All Events</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventsContainer;