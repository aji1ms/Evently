import React from 'react';
import { Calendar, MapPin, Users, Video, User, Share2, Bookmark } from 'lucide-react';
import Header from '../components/user/Containers/Header';

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
    description: string;
    image: string;
};

const sampleEvent: Event = {
    id: "evt-001",
    title: "Cyber Security Webinar",
    conductedBy: "Google",
    type: "online",
    count: 1247,
    details: {
        date: "2025-09-20",
        time: "2:00 PM - 4:00 PM",
        venue: "Google Meet"
    },
    description: "All about protecting systems, networks, and data from digital attacks. In this session, you'll learn the essentials of how hackers think, the common threats in today's digital world, and the tools and techniques used to defend against them. From understanding malware and phishing to exploring ethical hacking and secure coding, you'll gain practical knowledge that can help you safeguard both personal and organizational information.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

const EventDetails: React.FC<{ event?: Event }> = ({ event = sampleEvent }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 h-80">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute top-6 left-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${event.type === 'online'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-green-500 text-white'
                                    }`}>
                                    {event.type === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                    {event.type === 'online' ? 'Online Event' : 'Offline'}
                                </span>
                            </div>
                        </div>

                        {/* Event Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                                <div className="flex items-center gap-6 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span>by <strong className="text-gray-900">{event.conductedBy}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        <span><strong>{event.count.toLocaleString()}</strong> registered</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">What you will learn:</h2>
                                <p className="text-gray-700 leading-relaxed">{event.description}</p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    By the end, you'll know how to spot cyber risks, defend against them, and build a strong
                                    foundation for a secure digital future.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-3xl font-bold text-green-600">$200</span>
                                    <span className="text-gray-500">per ticket</span>
                                </div>

                                <button className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors mb-4">
                                    Buy Ticket
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    Free cancellation until 24 hours before event
                                </p>
                            </div>
                        </div>

                        {/* Event Details Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Event Details</h3>

                            <div className="space-y-4">
                                {/* Date & Time */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg mt-1">
                                        <Calendar className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{formatDate(event.details.date)}</p>
                                        <p className="text-gray-600 text-sm">{event.details.time}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg mt-1">
                                        {event.type === 'online' ? (
                                            <Video className="w-5 h-5 text-red-600" />
                                        ) : (
                                            <MapPin className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {event.details.venue || 'Online Platform'}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {event.type === 'online' ? 'Link will be shared before event' : 'Address details in confirmation email'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Organizer Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Organized By</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {event.conductedBy.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{event.conductedBy}</h4>
                                    <p className="text-gray-600 text-sm">Event Host</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;