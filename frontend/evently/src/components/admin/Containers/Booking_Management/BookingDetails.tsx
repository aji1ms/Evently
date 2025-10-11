import { useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Ticket, Hash, User, CreditCard, CheckCircle, Tag, FileText, ArrowLeft, MapPinned, Link, Mail, Phone } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import TicketDetailsShimmer from '../../../user/ShimmerUI/TicketDetailsShimmer';
import { getBookingDetails } from '../../../../Redux/slices/admin/adminBookingSlice';

const BookingDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { currentTicket, loading, } = useSelector((state: RootState) => state.adminBookings);

    useEffect(() => {
        if (id) {
            dispatch(getBookingDetails(id))
        }
    }, [dispatch, id]);

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <TicketDetailsShimmer />

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto p-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/admin/bookings")}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to My Tickets
                </button>

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={currentTicket?.event?.image}
                            alt={currentTicket?.event?.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        {currentTicket?.event?.title}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-200 capitalize border">
                                            {currentTicket?.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                                            {currentTicket?.event?.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Description */}
                    <div className="p-6 border-b">
                        <div className="flex items-start">
                            <FileText className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {currentTicket?.event?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className="p-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date & Time */}
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Event Date</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(currentTicket?.event?.eventDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Event Time</p>
                                        <p className="font-semibold text-gray-900">
                                            {currentTicket?.event?.eventTime}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Tag className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Event Type</p>
                                        <p className="font-semibold text-gray-900">
                                            {currentTicket?.event?.eventType}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                {currentTicket?.event?.eventType == "online" ? (
                                    <div className="flex items-start">
                                        <Link className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Meeting Link</p>
                                            <p className="font-semibold text-gray-900">
                                                {currentTicket?.event?.meetingLink}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Venue</p>
                                            <p className="font-semibold text-gray-900">
                                                {currentTicket?.event?.location?.venue}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {currentTicket?.event?.eventType == "offline" ? (
                                    <div className="flex items-start">
                                        <MapPinned className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Location</p>
                                            <p className="font-medium text-gray-900">
                                                {currentTicket?.event?.location?.address},{currentTicket?.event?.location?.city}
                                            </p>
                                            <p className="font-medium text-gray-900">
                                                {currentTicket?.event?.location?.state}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start">
                                        <MapPinned className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Location</p>
                                            <p className="font-semibold text-gray-900">
                                                Online Event
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start">
                                    <User className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Organizer</p>
                                        <p className="font-semibold text-gray-900">
                                            {currentTicket?.event?.organizer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Information */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <User className="w-6 h-6 mr-2 text-blue-500" />
                        User Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Hash className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">User Id</span>
                                </div>
                                <span className="font-mono font-semibold text-gray-900">{currentTicket?.user?._id}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">User Email</span>
                                </div>
                                <span className="font-semibold text-gray-900">{currentTicket?.user?.email}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">User Name</span>
                                </div>
                                <span className="font-semibold text-gray-900">{currentTicket?.user?.name}</span>
                            </div>
                            {currentTicket?.user?.phone && (
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-gray-500 mr-3" />
                                        <span className="text-gray-600">User Phone</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{currentTicket?.user?.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Ticket Information */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Ticket className="w-6 h-6 mr-2 text-blue-500" />
                        Ticket Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Hash className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Ticket Number</span>
                                </div>
                                <span className="font-mono font-semibold text-gray-900">{currentTicket?._id}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Ticket className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Ticket Quantity</span>
                                </div>
                                <span className="font-semibold text-gray-900">{currentTicket?.totalQuantity} tickets</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Price per Ticket</span>
                                </div>
                                <span className="font-semibold text-gray-900">${currentTicket?.event?.salePrice.toFixed(2)}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                </div>
                                <span className="font-bold text-xl text-blue-600">${currentTicket?.totalAmount}.00</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Purchase Date</span>
                                </div>
                                <span className="font-semibold text-gray-900">{formatDate(currentTicket?.createdAt)}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Payment Method</span>
                                </div>
                                <span className="font-semibold text-gray-900">{currentTicket?.paymentMethod}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Payment Status</span>
                                </div>
                                <span className="font-semibold capitalize flex items-center text-green-500">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {currentTicket?.paymentStatus}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Hash className="w-5 h-5 text-gray-500 mr-3" />
                                    <span className="text-gray-600">Transaction ID</span>
                                </div>
                                <span className="font-mono font-semibold text-gray-900">{currentTicket?.transactionId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BookingDetails;