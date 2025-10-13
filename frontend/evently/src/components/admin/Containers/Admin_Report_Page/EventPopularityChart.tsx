import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { EventPopularity } from '../../../../Redux/slices/admin/adminReportSlice';

interface IEventPopularityData {
    eventData: EventPopularity[] | undefined;
}

const EventPopularityChart = ({ eventData }: IEventPopularityData) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Event Popularity</h3>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eventData}>
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