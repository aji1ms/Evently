import { Edit2, Trash2, Calendar, MapPin, Users, Link, LocateFixed, Clock4 } from 'lucide-react';
import { adminDeleteEvent, type EventData } from '../../../../Redux/slices/admin/adminEventSlice';
import ToastCustomAlert from '../../../user/Inputs/ToastCustomAlert';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../Redux/store';
import toast from 'react-hot-toast';
import { useState } from 'react';
import EditEventModal from '../../../user/Inputs/EditEventModal';

interface Events {
    events: EventData[];
}

const AllEventsGrid = ({ events }: Events) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editEvent, setEditEvent] = useState<EventData | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = (event: EventData) => {
        setEditEvent(event);
        setEditModalOpen(true)
    }

    const handleDelete = (id: string) => {
        ToastCustomAlert(
            `Are you sure to delete this event?`,
            () => {
                dispatch(adminDeleteEvent(id)).unwrap()
                    .then(() => toast.success(`event deleted successfully`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        )
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div
                        key={event?._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-200 hover:shadow-xl border-gray-200"
                    >
                        {/* Event Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event?.image}
                                alt={event?.title}
                                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />

                            {event?.status === 'ongoing' && (
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-900/20 to-transparent flex items-center justify-center">
                                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                        ONGOING                                     </div>
                                </div>
                            )}

                            {event?.status === 'completed' && (
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-green-900/20 to-transparent flex items-center justify-center">
                                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                        COMPLETED
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Event Content */}
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                {event?.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                                {event?.description}
                            </p>

                            {/* Event Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-blue-500">
                                    <LocateFixed className="w-4 h-4 mr-2" />
                                    {event?.eventType}
                                </div>

                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(event?.eventDate)}
                                </div>

                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock4 className="w-4 h-4 mr-2" />
                                    {event?.eventTime}
                                </div>

                                {event?.eventType == 'offline' ? (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {event?.location?.venue}
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Link className="w-4 h-4 mr-2" />
                                        {event?.meetingLink}
                                    </div>
                                )}

                                <div className="flex items-center text-sm text-gray-500">
                                    <Users className="w-4 h-4 mr-2" />
                                    {event?.availableSeats} / {event?.totalSeats} attendees
                                </div>
                            </div>

                            {/* Capacity Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${(event?.availableSeats / event?.totalSeats) * 100 >= 90 ? 'bg-red-500' :
                                            (event?.availableSeats / event?.totalSeats) * 100 >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((event?.availableSeats / event?.totalSeats) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                    onClick={() => handleEdit(event)}
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>

                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <EditEventModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    event={editEvent}
                />
            </div>
            {events.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Calendar className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-500 mb-2">No events found</h3>
                    <p className="text-gray-400">Start by creating your first event</p>
                </div>
            )}
        </>

    )
}

export default AllEventsGrid;
