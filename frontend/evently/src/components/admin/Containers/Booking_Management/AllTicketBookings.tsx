import { User, Ticket, DollarSign } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import SearchFilter from './SearchFilter';
import BookedList from './BookedList';

export interface Booking {
    id: string;
    eventName: string;
    customerName: string;
    customerEmail: string;
    bookedDate: string;
    bookedTime: string;
    totalTicketsBooked: number;
    totalSoldPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    ticketType: string;
    phoneNumber: string;
}

const AllTicketBookings = () => {
    const bookings: Booking[] = [
        {
            id: 'BK001',
            eventName: 'Tech Conference 2024',
            customerName: 'John Doe',
            customerEmail: 'john.doe@email.com',
            bookedDate: '2024-10-15',
            bookedTime: '14:30',
            totalTicketsBooked: 2,
            totalSoldPrice: 299.98,
            status: 'confirmed',
            ticketType: 'VIP',
            phoneNumber: '+1-234-567-8901'
        },
        {
            id: 'BK002',
            eventName: 'Digital Marketing Summit',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah.johnson@email.com',
            bookedDate: '2024-10-16',
            bookedTime: '09:15',
            totalTicketsBooked: 1,
            totalSoldPrice: 89.99,
            status: 'confirmed',
            ticketType: 'Regular',
            phoneNumber: '+1-234-567-8902'
        },
        {
            id: 'BK003',
            eventName: 'Music Festival 2024',
            customerName: 'Mike Chen',
            customerEmail: 'mike.chen@email.com',
            bookedDate: '2024-10-14',
            bookedTime: '16:45',
            totalTicketsBooked: 4,
            totalSoldPrice: 199.96,
            status: 'pending',
            ticketType: 'General',
            phoneNumber: '+1-234-567-8903'
        },
        {
            id: 'BK004',
            eventName: 'Startup Pitch Competition',
            customerName: 'Emily Davis',
            customerEmail: 'emily.davis@email.com',
            bookedDate: '2024-10-17',
            bookedTime: '11:20',
            totalTicketsBooked: 3,
            totalSoldPrice: 149.97,
            status: 'confirmed',
            ticketType: 'Premium',
            phoneNumber: '+1-234-567-8904'
        },
        {
            id: 'BK005',
            eventName: 'Tech Conference 2024',
            customerName: 'David Wilson',
            customerEmail: 'david.wilson@email.com',
            bookedDate: '2024-10-13',
            bookedTime: '13:10',
            totalTicketsBooked: 1,
            totalSoldPrice: 149.99,
            status: 'cancelled',
            ticketType: 'VIP',
            phoneNumber: '+1-234-567-8905'
        },
        {
            id: 'BK006',
            eventName: 'Digital Marketing Summit',
            customerName: 'Lisa Brown',
            customerEmail: 'lisa.brown@email.com',
            bookedDate: '2024-10-18',
            bookedTime: '10:00',
            totalTicketsBooked: 2,
            totalSoldPrice: 179.98,
            status: 'confirmed',
            ticketType: 'Regular',
            phoneNumber: '+1-234-567-8906'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
                    <p className="text-gray-600">Manage all ticket bookings and details</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Booking"
                        value={10}
                        icon={<Ticket className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={100}
                        icon={<DollarSign className="w-6 h-6 text-green-600" />}
                    />

                    <StatsCard
                        title="Total Tickets Sold"
                        value={150}
                        icon={<User className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Filters */}

                <SearchFilter />

                {/* Bookings Table */}

                <BookedList bookings={bookings} />
            </div>
        </div>
    );
};

export default AllTicketBookings;