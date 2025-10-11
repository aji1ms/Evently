import { useNavigate } from "react-router";
import type { BookingData } from "../../../../Redux/slices/admin/adminBookingSlice";
import { Eye, Calendar, Ticket } from 'lucide-react';

interface AllBookings {
    booking: BookingData[]
}

const BookedList = ({ booking }: AllBookings) => {
    const navigate = useNavigate();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Event Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booked Date & Time
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tickets
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Price
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {booking.map((booking) => (
                            <tr key={booking?._id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking?._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="max-w-xs truncate">{booking?.event?.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking?.user?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(booking?.bookingDate)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center">
                                        <Ticket className="w-4 h-4 mr-1 text-gray-400" />
                                        {booking?.totalQuantity}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    ${booking?.totalAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200">
                                        {booking?.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                                        onClick={() => navigate(`/admin/booking/${booking?._id}`)}
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {booking.length === 0 && (
                <div className="text-center py-12">
                    <Ticket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-500 mb-2">No bookings found</h3>
                    <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}

export default BookedList
