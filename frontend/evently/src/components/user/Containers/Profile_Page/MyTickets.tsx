import { useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Ticket, Hash, ChevronRight, ChevronLeft, Link } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchTickets, setCurrentPage } from '../../../../Redux/slices/auth/authTicketSlice';
import TicketPageShimmer from '../../ShimmerUI/TicketPageShimmer';
import { useNavigate } from 'react-router';

const MyTickets = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {
        tickets,
        loading,
        currentPage,
        totalPages,
        totalTickets,
        hasNextPage,
        hasPrevPage
    } = useSelector((state: RootState) => state.authTickets);

    useEffect(() => {
        dispatch(fetchTickets(currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        dispatch(fetchTickets(page));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) return <TicketPageShimmer />

    return (
        <div className="flex-1 bg-gray-50 p-6">
            <div className=" mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">My Tickets</h1>
                    <p className="text-gray-600">Showing {tickets.length} of {totalTickets} tickets</p>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {tickets.map((ticket) => (
                        <div key={ticket?._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                            {/* Your existing ticket card content */}
                            <div className="relative h-32 overflow-hidden rounded-t-lg">
                                <img
                                    src={ticket?.event?.image}
                                    alt={ticket?.event?.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2">{ticket?.event?.title}</h3>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-start text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span>{formatDate(ticket?.event?.eventDate)}</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span> {ticket?.event?.eventTime}</span>
                                    </div>
                                    {ticket?.event?.eventType == 'online' ? (
                                        <div className="flex items-start text-sm text-gray-600">
                                            <Link className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">
                                                {ticket?.event?.meetingLink}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-start text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">
                                                {ticket?.event?.location?.venue}, {ticket?.event?.location?.city}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded p-3 space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 flex items-center">
                                            <Ticket className="w-3.5 h-3.5 mr-1.5" />
                                            Qty
                                        </span>
                                        <span className="font-semibold">{ticket?.totalQuantity}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 flex items-center">
                                            <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                                            Price
                                        </span>
                                        <span className="font-semibold">${ticket?.event?.salePrice.toFixed(2)}</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">Total</span>
                                            <span className="font-bold text-blue-600">${ticket?.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 text-xs text-gray-500 flex items-center">
                                    <Hash className="w-3 h-3 mr-1" />
                                    <span className="font-medium text-black mr-2">Ticket Number:</span>
                                    <span className="font-mono text-gray-600">{ticket?._id}</span>
                                </div>

                                <button
                                    onClick={() => navigate(`/ticket/${ticket?._id}`)}
                                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Component */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-end border-t border-gray-200 pt-6">
                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!hasPrevPage}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${hasPrevPage
                                    ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                    : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!hasNextPage}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${hasNextPage
                                    ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                    : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                                    }`}
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {tickets.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No tickets found</h3>
                    </div>
                )}
            </div>
        </div >
    );
};

export default MyTickets;