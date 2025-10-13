import React, { useEffect, useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import type { EventData } from '../../../Redux/slices/admin/adminEventSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../Redux/store';
import { fetchAllCategories } from '../../../Redux/slices/admin/adminCategorySlice';
import { adminEditEvent } from '../../../Redux/slices/admin/adminEventSlice'; // Import the action
import toast from 'react-hot-toast';

interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: EventData | null;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
    isOpen,
    onClose,
    event,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.adminCategories);
    const { editLoading, editError } = useSelector((state: RootState) => state.adminEvents);

    useEffect(() => {
        dispatch(fetchAllCategories({}))
    }, [dispatch])

    const [eventData, setEventData] = useState<EventData>({
        _id: '',
        title: '',
        description: '',
        category: '',
        eventType: '',
        meetingLink: '',
        location: {
            venue: '',
            address: '',
            city: '',
            state: ''
        },
        eventDate: '',
        eventTime: '',
        regularPrice: 0,
        salePrice: 0,
        totalSeats: 0,
        availableSeats: 0,
        organizer: '',
        image: '',
        status: ''
    });
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (event) {
            const categoryName = typeof event.category === 'object' && event.category !== null
                ? (event.category as any).name || ''
                : event.category || '';

            const eventDate = event.eventDate
                ? new Date(event.eventDate).toISOString().split('T')[0]
                : '';

            setEventData({
                ...event,
                category: categoryName,
                eventDate: eventDate
            });
            setImagePreview(event.image);
        }
    }, [event]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let processedValue: string | number = value;
        if (['regularPrice', 'salePrice', 'totalSeats', 'availableSeats'].includes(name)) {
            processedValue = value === '' ? 0 : Number(value);
        }

        setEventData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            location: {
                ...prev.location!,
                [name]: value
            }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
                return;
            }

            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, image: 'Please upload a valid image file' }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setImageFile(file);
            setErrors(prev => ({ ...prev, image: '' }));
        }
    };

    const removeImage = () => {
        setImagePreview('');
        setImageFile(null);
        setEventData(prev => ({ ...prev, image: '' }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!eventData.title.trim()) newErrors.title = 'Event title is required';
        if (!eventData.description.trim()) newErrors.description = 'Description is required';
        if (!eventData.category) newErrors.category = 'Category is required';
        if (!eventData.eventDate) newErrors.eventDate = 'Event date is required';
        if (!eventData.eventTime) newErrors.eventTime = 'Event time is required';
        if (!eventData.organizer.trim()) newErrors.organizer = 'Organizer is required';

        if (eventData.eventType === 'online' && !eventData.meetingLink?.trim()) {
            newErrors.meetingLink = 'Meeting link is required for online events';
        }

        if (eventData.eventType === 'offline') {
            if (!eventData.location?.venue?.trim()) newErrors.venue = 'Venue is required';
            if (!eventData.location?.address?.trim()) newErrors.address = 'Address is required';
            if (!eventData.location?.city?.trim()) newErrors.city = 'City is required';
            if (!eventData.location?.state?.trim()) newErrors.state = 'State is required';
        }

        const regularPrice = Number(eventData.regularPrice);
        const salePrice = Number(eventData.salePrice);
        const totalSeats = Number(eventData.totalSeats);
        const availableSeats = Number(eventData.availableSeats);

        if (salePrice > regularPrice) {
            newErrors.salePrice = 'Sale price cannot be greater than regular price';
        }

        if (availableSeats > totalSeats) {
            newErrors.availableSeats = 'Available seats cannot exceed total seats';
        }

        if (regularPrice < 0) newErrors.regularPrice = 'Price cannot be negative';
        if (salePrice < 0) newErrors.salePrice = 'Price cannot be negative';
        if (totalSeats < 1) newErrors.totalSeats = 'Total seats must be at least 1';
        if (availableSeats < 0) newErrors.availableSeats = 'Available seats cannot be negative';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        if (!event || !event._id) {
            setErrors(prev => ({ ...prev, submit: 'Event ID is missing' }));
            return;
        }
        const formData = new FormData();

        formData.append('title', eventData.title.trim());
        formData.append('description', eventData.description.trim());
        formData.append('category', eventData.category);
        formData.append('eventType', eventData.eventType);
        formData.append('eventDate', eventData.eventDate);
        formData.append('eventTime', eventData.eventTime);

        formData.append('regularPrice', String(Number(eventData.regularPrice)));
        formData.append('salePrice', String(Number(eventData.salePrice)));
        formData.append('totalSeats', String(Number(eventData.totalSeats)));
        formData.append('availableSeats', String(Number(eventData.availableSeats)));

        formData.append('organizer', eventData.organizer.trim());
        formData.append('status', eventData.status);

        if (imageFile) {
            formData.append('image', imageFile);
        } else if (eventData.image) {
            formData.append('image', eventData.image);
        }

        if (eventData.eventType === 'offline' && eventData.location) {
            formData.append('location[venue]', eventData.location.venue.trim());
            formData.append('location[address]', eventData.location.address.trim());
            formData.append('location[city]', eventData.location.city.trim());
            formData.append('location[state]', eventData.location.state.trim());
        }

        if (eventData.eventType === 'online' && eventData.meetingLink) {
            formData.append('meetingLink', eventData.meetingLink.trim());
        }
        try {
            await dispatch(adminEditEvent({
                eventId: event._id,
                formData
            })).unwrap();

            toast.success("Event updated successfully!");
            handleClose()
        } catch (error: any) {
            const errorMessage = error || editError || 'Failed to update event';
            setErrors(prev => ({ ...prev, submit: errorMessage }));
            toast.error(errorMessage);
        }
    };

    const handleClose = () => {
        setErrors({});
        setImageFile(null);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800">Edit Event</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                <label className="cursor-pointer block">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Event preview"
                                                className="flex mx-auto h-48 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <Upload className="text-gray-400 mb-2" size={40} />
                                            <p className="text-sm text-gray-600">Click to upload image</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Event Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter event title"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter event description"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={eventData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">
                                        {categoriesLoading ? 'Loading categories...' : 'Select category'}
                                    </option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            {/* Event Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Type
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                    {eventData.eventType === 'online' ? (
                                        <span className="text-sm">Online Event</span>
                                    ) : (
                                        <span className="text-sm">Offline Event</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Event type cannot be changed
                                </p>
                            </div>

                            {/* Online Event Fields */}
                            {eventData.eventType === 'online' && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meeting Link *
                                    </label>
                                    <input
                                        type="url"
                                        name="meetingLink"
                                        value={eventData.meetingLink || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://meet.example.com/event"
                                    />
                                    {errors.meetingLink && <p className="text-red-500 text-sm mt-1">{errors.meetingLink}</p>}
                                </div>
                            )}

                            {/* Offline Event Fields */}
                            {eventData.eventType === 'offline' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Venue *
                                        </label>
                                        <input
                                            type="text"
                                            name="venue"
                                            value={eventData.location?.venue || ''}
                                            onChange={handleLocationChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={eventData.location?.address || ''}
                                            onChange={handleLocationChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={eventData.location?.city || ''}
                                            onChange={handleLocationChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={eventData.location?.state || ''}
                                            onChange={handleLocationChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                    </div>
                                </>
                            )}

                            {/* Event Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Date *
                                </label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    value={eventData.eventDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
                            </div>

                            {/* Event Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Time *
                                </label>
                                <input
                                    type="time"
                                    name="eventTime"
                                    value={eventData.eventTime}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.eventTime && <p className="text-red-500 text-sm mt-1">{errors.eventTime}</p>}
                            </div>

                            {/* Regular Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Regular Price *
                                </label>
                                <input
                                    type="number"
                                    name="regularPrice"
                                    value={eventData.regularPrice}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.regularPrice && <p className="text-red-500 text-sm mt-1">{errors.regularPrice}</p>}
                            </div>

                            {/* Sale Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sale Price *
                                </label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={eventData.salePrice}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.salePrice && <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>}
                            </div>

                            {/* Total Seats */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Seats *
                                </label>
                                <input
                                    type="number"
                                    name="totalSeats"
                                    value={eventData.totalSeats}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.totalSeats && <p className="text-red-500 text-sm mt-1">{errors.totalSeats}</p>}
                            </div>

                            {/* Available Seats */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Seats *
                                </label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    value={eventData.availableSeats}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.availableSeats && <p className="text-red-500 text-sm mt-1">{errors.availableSeats}</p>}
                            </div>

                            {/* Organizer */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organizer *
                                </label>
                                <input
                                    type="text"
                                    name="organizer"
                                    value={eventData.organizer}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.organizer && <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={eventData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {errors.submit && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                {errors.submit}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
                    <button
                        onClick={handleClose}
                        disabled={editLoading}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={editLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {editLoading && <Loader2 size={16} className="animate-spin" />}
                        {editLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;