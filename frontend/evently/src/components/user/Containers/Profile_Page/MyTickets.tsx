import React from 'react';
import { Calendar, Clock, MapPin, DollarSign, Ticket, Hash, } from 'lucide-react';

interface TicketData {
    id: string;
    eventImage: string;
    eventTitle: string;
    eventTime: string;
    eventDate: string;
    eventLocation: string;
    ticketPrice: number;
    ticketCount: number;
    ticketNumber: string;
    status: 'upcoming' | 'completed' | 'cancelled';
}

// Mock ticket data
const mockTickets: TicketData[] = [
    {
        id: '1',
        eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop',
        eventTitle: 'Summer Music Festival 2024',
        eventTime: '6:00 PM',
        eventDate: '2024-07-15',
        eventLocation: 'Central Park, New York',
        ticketPrice: 75.00,
        ticketCount: 2,
        ticketNumber: 'SMF2024001',
        status: 'upcoming'
    },
    {
        id: '2',
        eventImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=250&fit=crop',
        eventTitle: 'Tech Conference 2024',
        eventTime: '9:00 AM',
        eventDate: '2024-08-22',
        eventLocation: 'Convention Center, San Francisco',
        ticketPrice: 120.00,
        ticketCount: 1,
        ticketNumber: 'TC2024002',
        status: 'upcoming'
    },
];

const MyTickets: React.FC = () => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTotalPrice = (price: number, count: number) => {
        return (price * count).toFixed(2);
    };

    return (
        <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
                </div>
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {mockTickets.length} ticket
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockTickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={ticket.eventImage}
                                    alt={ticket.eventTitle}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium capitalize bg-green-100 text-green-800">
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>

                            {/* Ticket Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{ticket.eventTitle}</h3>

                                <div className="space-y-3 mb-6">
                                    {/* Date & Time */}
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                                        <span className="font-medium">{formatDate(ticket.eventDate)}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-5 h-5 mr-3 text-blue-500" />
                                        <span>{ticket.eventTime}</span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                                        <span>{ticket.eventLocation}</span>
                                    </div>
                                </div>

                                {/* Ticket Details */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-700">
                                            <Hash className="w-4 h-4 mr-2 text-gray-500" />
                                            <span className="font-medium">Ticket Number</span>
                                        </div>
                                        <span className="font-mono text-sm bg-white px-2 py-1 rounded">{ticket.ticketNumber}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-700">
                                            <Ticket className="w-4 h-4 mr-2 text-gray-500" />
                                            <span className="font-medium">Quantity</span>
                                        </div>
                                        <span className="font-semibold">{ticket.ticketCount} tickets</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-700">
                                            <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                            <span className="font-medium">Price per ticket</span>
                                        </div>
                                        <span className="font-semibold">${ticket.ticketPrice.toFixed(2)}</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">Total Paid</span>
                                            <span className="font-bold text-lg text-blue-600">${getTotalPrice(ticket.ticketPrice, ticket.ticketCount)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {mockTickets.length === 0 && (
                    <div className="text-center py-12">
                        <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;