import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';


const revenueData = [
    { name: 'Ticket Sales', value: 45000, color: '#3B82F6' },
    { name: 'Merchandise', value: 12000, color: '#10B981' },
    { name: 'Sponsorships', value: 28000, color: '#F59E0B' },
    { name: 'Food & Beverage', value: 15000, color: '#EF4444' },
];

const RevenueBreakdown = () => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
                <span className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toLocaleString()}
                </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
                {revenueData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-gray-600">{item.name}</span>
                        </div>
                        <span className="font-medium">${item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RevenueBreakdown
