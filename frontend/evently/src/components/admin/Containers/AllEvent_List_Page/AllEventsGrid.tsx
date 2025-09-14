import { Edit2, Trash2, Eye, EyeOff, Calendar, MapPin, Users } from 'lucide-react';
import type { Event } from './AllEvents';

interface EventData {
    events: Event[];
}

const AllEventsGrid = ({ events }: EventData) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-200 hover:shadow-xl ${event.isBlocked ? 'border-red-200 opacity-75' : 'border-gray-200'
                            }`}
                    >
                        {/* Event Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                            {event.isBlocked && (
                                <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        BLOCKED
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Event Content */}
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                {event.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(event.date)}
                                </div>

                                <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {event.venue}
                                </div>

                                <div className="flex items-center text-sm text-gray-500">
                                    <Users className="w-4 h-4 mr-2" />
                                    {event.attendees} / {event.capacity} attendees
                                </div>
                            </div>

                            {/* Capacity Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${(event.attendees / event.capacity) * 100 >= 90 ? 'bg-red-500' :
                                            (event.attendees / event.capacity) * 100 >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>

                                <button
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${event.isBlocked
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                        }`}
                                >
                                    {event.isBlocked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    {event.isBlocked ? 'Unblock' : 'Block'}
                                </button>

                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {events.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Calendar className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-500 mb-2">No events found</h3>
                    <p className="text-gray-400">Start by creating your first event</p>
                </div>
            )}
        </>

    )
}

export default AllEventsGrid
