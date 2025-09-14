import { TrendingUp, Ticket } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import AllEventsGrid from './AllEventsGrid';

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    venue: string;
    image: string;
    capacity: number;
    isBlocked: boolean;
    attendees: number;
}

const AllEvents = () => {
    const events: Event[] = [
        {
            id: 1,
            title: "Tech Conference 2024",
            description: "Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
            date: "2024-11-15",
            venue: "Convention Center, New York",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
            capacity: 500,
            isBlocked: false,
            attendees: 320
        },
        {
            id: 2,
            title: "Digital Marketing Summit",
            description: "Learn the latest digital marketing strategies from experts and boost your online presence with cutting-edge techniques.",
            date: "2024-12-03",
            venue: "Business Hub, San Francisco",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
            capacity: 300,
            isBlocked: false,
            attendees: 185
        },
        {
            id: 3,
            title: "Music Festival 2024",
            description: "Experience an unforgettable night of music with top artists from around the world in this outdoor festival.",
            date: "2024-10-28",
            venue: "Central Park, New York",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            capacity: 1000,
            isBlocked: true,
            attendees: 750
        },
        {
            id: 4,
            title: "Startup Pitch Competition",
            description: "Watch innovative startups pitch their ideas to top investors and compete for funding opportunities.",
            date: "2024-11-20",
            venue: "Innovation Center, Austin",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
            capacity: 200,
            isBlocked: false,
            attendees: 150
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80">
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
                        value={events.length}
                    />

                    <StatsCard
                        title='Active Events'
                        icon={<Ticket className="w-6 h-6 text-green-600" />}
                        value={events.filter(e => !e.isBlocked).length}
                    />

                    <StatsCard
                        title='Blocked'
                        icon={<Ticket className="w-6 h-6 text-red-600" />}
                        value={events.filter(e => e.isBlocked).length}
                    />
                </div>

                {/* Events Grid */}

                <AllEventsGrid events={events} />

            </div>
        </div>
    );
};

export default AllEvents;