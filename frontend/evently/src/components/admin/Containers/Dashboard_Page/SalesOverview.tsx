import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    sales: number;
    revenue: number;
}

const SalesOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    const chartData: Record<'weekly' | 'monthly' | 'yearly', ChartData[]> = {
        weekly: [
            { name: 'Mon', sales: 45, revenue: 3200 },
            { name: 'Tue', sales: 52, revenue: 3800 },
            { name: 'Wed', sales: 38, revenue: 2900 },
            { name: 'Thu', sales: 61, revenue: 4100 },
            { name: 'Fri', sales: 73, revenue: 5200 },
            { name: 'Sat', sales: 89, revenue: 6300 },
            { name: 'Sun', sales: 67, revenue: 4800 }
        ],
        monthly: [
            { name: 'Jan', sales: 245, revenue: 18500 },
            { name: 'Feb', sales: 312, revenue: 23400 },
            { name: 'Mar', sales: 198, revenue: 15600 },
            { name: 'Apr', sales: 387, revenue: 28900 },
            { name: 'May', sales: 456, revenue: 34200 },
            { name: 'Jun', sales: 398, revenue: 29700 },
            { name: 'Jul', sales: 523, revenue: 39100 },
            { name: 'Aug', sales: 467, revenue: 35200 }
        ],
        yearly: [
            { name: '2020', sales: 1245, revenue: 95000 },
            { name: '2021', sales: 1876, revenue: 142000 },
            { name: '2022', sales: 2234, revenue: 168000 },
            { name: '2023', sales: 2856, revenue: 215000 },
            { name: '2024', sales: 3124, revenue: 235000 }
        ]
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${selectedPeriod === period
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData[selectedPeriod]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesOverview
