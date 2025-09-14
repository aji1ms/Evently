import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bookingTrendsData = [
    { week: 'Week 1', bookings: 245 },
    { week: 'Week 2', bookings: 380 },
    { week: 'Week 3', bookings: 290 },
    { week: 'Week 4', bookings: 420 },
    { week: 'Week 5', bookings: 350 },
    { week: 'Week 6', bookings: 480 },
    { week: 'Week 7', bookings: 390 },
    { week: 'Week 8', bookings: 520 },
];

const BookingTrends = () => {
    const [selectedMetric, setSelectedMetric] = useState('bookings');

    return (
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Booking Trends</h3>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setSelectedMetric('bookings')}
                        className={`px-3 py-1 rounded text-sm ${selectedMetric === 'bookings'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setSelectedMetric('monthly')}
                        className={`px-3 py-1 rounded text-sm ${selectedMetric === 'monthly'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BookingTrends
