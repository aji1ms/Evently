import { Ticket } from 'lucide-react';

interface EventData {
    name: string;
    ticketPrice: number;
    sold: number;
    revenue: number;
}

const BestSelling = () => {
    const bestSellingEvents: EventData[] = [
        { name: "Tech Conference 2024", ticketPrice: 299, sold: 156, revenue: 46644 },
        { name: "Music Festival Summer", ticketPrice: 89, sold: 234, revenue: 20826 },
        { name: "Business Workshop Series", ticketPrice: 149, sold: 87, revenue: 12963 },
        { name: "Art Gallery Opening", ticketPrice: 45, sold: 198, revenue: 8910 },
        { name: "Food & Wine Tasting", ticketPrice: 75, sold: 112, revenue: 8400 }
    ];
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Best Selling Events</h3>
                <Ticket className="w-5 h-5 text-gray-400" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-medium text-gray-600">Event Name</th>
                            <th className="text-right py-3 px-2 font-medium text-gray-600">Price</th>
                            <th className="text-right py-3 px-2 font-medium text-gray-600">Sold</th>
                            <th className="text-right py-3 px-2 font-medium text-gray-600">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSellingEvents.map((event, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-2 font-medium text-gray-900">{event.name}</td>
                                <td className="py-3 px-2 text-right text-gray-700">${event.ticketPrice}</td>
                                <td className="py-3 px-2 text-right text-gray-700">{event.sold}</td>
                                <td className="py-3 px-2 text-right font-semibold text-green-600">${event.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BestSelling
