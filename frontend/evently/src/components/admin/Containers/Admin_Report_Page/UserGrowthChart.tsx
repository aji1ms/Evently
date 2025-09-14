import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { RefreshCw } from 'lucide-react';

const userGrowthData = [
    { month: 'Jan', users: 1200, newUsers: 150 },
    { month: 'Feb', users: 1380, newUsers: 180 },
    { month: 'Mar', users: 1650, newUsers: 270 },
    { month: 'Apr', users: 1890, newUsers: 240 },
    { month: 'May', users: 2140, newUsers: 250 },
    { month: 'Jun', users: 2450, newUsers: 310 },
];

const UserGrowthChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                        }}
                    />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.1}
                        name="Total Users"
                    />
                    <Line
                        type="monotone"
                        dataKey="newUsers"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="New Users"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default UserGrowthChart
