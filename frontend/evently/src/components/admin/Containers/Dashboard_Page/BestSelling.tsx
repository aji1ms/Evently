import { Ticket } from 'lucide-react';
import type { BestSellingEvent } from '../../../../Redux/slices/admin/adminDashboardSlice';

interface EventData {
    bestSelling: BestSellingEvent[] | undefined;
}

const BestSelling = ({ bestSelling }: EventData) => {
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
                        {bestSelling?.map((event, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-2 font-medium text-gray-900">{event?.name}</td>
                                <td className="py-3 px-2 text-right text-gray-700">${event?.price}</td>
                                <td className="py-3 px-2 text-right text-gray-700">{event?.sold}</td>
                                <td className="py-3 px-2 text-right font-semibold text-green-600">${event?.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BestSelling
