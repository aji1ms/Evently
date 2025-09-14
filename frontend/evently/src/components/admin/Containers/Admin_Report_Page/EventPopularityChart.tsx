import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const eventPopularityData = [
    { name: 'Tech Conference', bookings: 450, capacity: 500 },
    { name: 'Music Festival', bookings: 890, capacity: 1000 },
    { name: 'Art Workshop', bookings: 120, capacity: 150 },
    { name: 'Business Summit', bookings: 320, capacity: 400 },
    { name: 'Food & Wine', bookings: 680, capacity: 750 },
];

const EventPopularityChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Event Popularity</h3>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>All Events</option>
                    <option>This Month</option>
                    <option>Upcoming</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eventPopularityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                    />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                        }}
                        formatter={(value) => [value, 'Bookings']}
                        labelFormatter={(label) => `Event: ${label}`}
                    />
                    <Bar
                        dataKey="bookings"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EventPopularityChart;