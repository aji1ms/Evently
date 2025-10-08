import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Image, Save, Ticket, Building2, Monitor, Navigation, Home, Upload, X, Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../../Redux/slices/admin/adminCategorySlice';
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { adminAddEvent } from '../../../../Redux/slices/admin/adminEventSlice';
import toast from 'react-hot-toast';

interface EventFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    eventType: 'online' | 'offline' | '';
    category: string;
    venue: string;
    address: string;
    city: string;
    state: string;
    link: string;
    image: string;
    imageFile: File | null;
    totalSeats: string;
    availableSeats: string;
    regularPrice: string;
    salePrice: string;
    organizer: string;
    status: string;
}

const AddEventsForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.adminCategories);
    const { loading, error } = useSelector((state: RootState) => state.adminEvents);

    useEffect(() => {
        dispatch(fetchAllCategories({}))
    }, [dispatch])

    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        date: '',
        time: '',
        eventType: '',
        category: '',
        venue: '',
        address: '',
        city: '',
        state: '',
        link: '',
        image: '',
        imageFile: null,
        totalSeats: '',
        availableSeats: '',
        regularPrice: '',
        salePrice: '',
        organizer: '',
        status: 'upcoming'
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors) {
            setErrors('');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors('Image size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                setErrors('Please upload a valid image file');
                return;
            }

            setFormData(prev => ({
                ...prev,
                imageFile: file,
                image: ''
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: null,
            image: ''
        }));
        setImagePreview('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setErrors('Event title is required');
            return;
        }
        if (!formData.description.trim()) {
            setErrors('Event description is required');
            return;
        }
        if (!formData.category) {
            setErrors('Please select a category');
            return;
        }
        if (!formData.eventType) {
            setErrors('Please select event type');
            return;
        }
        if (!formData.date) {
            setErrors('Event date is required');
            return;
        }
        if (!formData.time) {
            setErrors('Event time is required');
            return;
        }

        if (!formData.totalSeats || Number(formData.totalSeats) <= 0) {
            setErrors('Please enter valid event capacity');
            return;
        }

        if (!formData.availableSeats || Number(formData.availableSeats) <= 0) {
            setErrors('Please enter valid available capacity');
            return;
        }

        if (!formData.regularPrice || Number(formData.regularPrice) < 0) {
            setErrors('Please enter valid regular price');
            return;
        }
        if (!formData.salePrice || Number(formData.salePrice) < 0) {
            setErrors('Please enter valid sale price');
            return;
        }
        if (!formData.organizer.trim()) {
            setErrors('Organizer name is required');
            return;
        }
        if (!formData.imageFile) {
            setErrors('Event image is required');
            return;
        }

        if (formData.eventType === 'online' && !formData.link.trim()) {
            setErrors('Meeting link is required for online events');
            return;
        }

        if (formData.eventType === 'offline') {
            if (!formData.venue.trim()) {
                setErrors('Venue is required for offline events');
                return;
            }
            if (!formData.address.trim()) {
                setErrors('Address is required for offline events');
                return;
            }
            if (!formData.city.trim()) {
                setErrors('City is required for offline events');
                return;
            }
            if (!formData.state.trim()) {
                setErrors('State is required for offline events');
                return;
            }
        }

        const submitData = new FormData();

        submitData.append('title', formData.title.trim());
        submitData.append('description', formData.description.trim());
        submitData.append('category', formData.category);
        submitData.append('eventType', formData.eventType);
        submitData.append('eventDate', formData.date);
        submitData.append('eventTime', formData.time);
        submitData.append('regularPrice', formData.regularPrice);
        submitData.append('salePrice', formData.salePrice);
        submitData.append('totalSeats', formData.totalSeats);
        submitData.append('availableSeats', formData.availableSeats);
        submitData.append('organizer', formData.organizer.trim());
        submitData.append('status', formData.status);

        if (formData.imageFile) {
            submitData.append('image', formData.imageFile);
        }

        if (formData.eventType === 'online') {
            submitData.append('meetingLink', formData.link.trim());
        } else if (formData.eventType === 'offline') {
            submitData.append('location[venue]', formData.venue.trim());
            submitData.append('location[address]', formData.address.trim());
            submitData.append('location[city]', formData.city.trim());
            submitData.append('location[state]', formData.state.trim());
        }

        dispatch(adminAddEvent(submitData))
            .unwrap()
            .then(() => {
                toast.success('Event created successfully!', { duration: 2000 });
                setFormData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    eventType: '',
                    category: '',
                    venue: '',
                    address: '',
                    city: '',
                    state: '',
                    link: '',
                    image: '',
                    imageFile: null,
                    totalSeats: '',
                    availableSeats: '',
                    regularPrice: '',
                    salePrice: '',
                    organizer: '',
                    status: 'upcoming'
                });
                setImagePreview('');
                setErrors('');
            })
            .catch((err: string) => {
                setErrors(err);
                toast.error(err || 'Failed to create event');
            });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
            <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Event Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Enter event title"
                            />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none border-gray-300 focus:border-blue-500"
                                placeholder="Describe your event in detail..."
                            />
                        </div>

                        {/* Organizer */}
                        <div>
                            <label htmlFor="organizer" className="block text-sm font-semibold text-gray-700 mb-2">
                                <Users className="inline mr-2" size={16} />
                                Organizer Name *
                            </label>
                            <input
                                type="text"
                                id="organizer"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Enter organizer name"
                            />
                        </div>

                        {/* Event Type and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Type *
                                </label>
                                <select
                                    id="eventType"
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                >
                                    <option value="">Select event type</option>
                                    <option value="offline">Offline</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Tag className="inline mr-2" size={16} />
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
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
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="inline mr-2" size={16} />
                                    Event Date *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Clock className="inline mr-2" size={16} />
                                    Event Time *
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="regularPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Ticket className="inline mr-2" size={16} />
                                    Regular Price *
                                </label>
                                <input
                                    type="number"
                                    id="regularPrice"
                                    name="regularPrice"
                                    value={formData.regularPrice}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="salePrice" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Ticket className="inline mr-2" size={16} />
                                    Sale Price *
                                </label>
                                <input
                                    type="number"
                                    id="salePrice"
                                    name="salePrice"
                                    value={formData.salePrice}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        {/* Conditional Location / Link Fields */}
                        {formData.eventType === 'offline' && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <Navigation className="mr-2" size={18} />
                                    Location Details
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MapPin className="inline mr-2" size={16} />
                                            Venue *
                                        </label>
                                        <input
                                            type="text"
                                            id="venue"
                                            name="venue"
                                            value={formData.venue}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                            placeholder="Enter venue name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Home className="inline mr-2" size={16} />
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                            placeholder="Street address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Building2 className="inline mr-2" size={16} />
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                            placeholder="Enter city"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Building2 className="inline mr-2" size={16} />
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                            placeholder="Enter state"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {formData.eventType === 'online' && (
                            <div>
                                <label htmlFor="link" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Monitor className="inline mr-2" size={16} />
                                    Meeting Link *
                                </label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                    placeholder="https://zoom.us/j/... or meeting platform link"
                                />
                            </div>
                        )}

                        {/* Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="totalSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Users className="inline mr-2" size={16} />
                                    Total Seats *
                                </label>
                                <input
                                    type="number"
                                    id="totalSeats"
                                    name="totalSeats"
                                    value={formData.totalSeats}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                    placeholder="Maximum number of attendees"
                                    min="1"
                                />
                            </div>

                            <div>
                                <label htmlFor="availableSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Users className="inline mr-2" size={16} />
                                    Available Seats *
                                </label>
                                <input
                                    type="number"
                                    id="availableSeats"
                                    name="availableSeats"
                                    value={formData.availableSeats}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                    placeholder="Maximum number of attendees"
                                    min="1"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Image className="inline mr-2" size={16} />
                                Event Image *
                            </label>

                            {!imagePreview ? (
                                <div className="space-y-3">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            id="imageFile"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="imageFile"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="text-gray-400 mb-2" size={32} />
                                            <span className="text-sm text-gray-600 mb-1">
                                                Click to upload or drag and drop
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 5MB
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Event preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Event Preview Card */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Preview</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Title:</strong>
                                    <span className="text-gray-600">{formData.title || 'Event title will appear here'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Organizer:</strong>
                                    <span className="text-gray-600">{formData.organizer || 'Enter organizer name'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Category:</strong>
                                    <span className="text-gray-600">
                                        {formData.category || 'Select category'}
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Type:</strong>
                                    <span className="text-gray-600">
                                        {formData.eventType === 'online' ? '🌐 Online' :
                                            formData.eventType === 'offline' ? '📍 Offline' : 'Select event type'}
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Date:</strong>
                                    <span className="text-gray-600">
                                        {formData.date || 'Select date'} {formData.time && `at ${formData.time}`}
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Location:</strong>
                                    <span className="text-gray-600">
                                        {formData.eventType === 'online' ?
                                            (formData.link ? 'Online Meeting' : 'Enter meeting link') :
                                            formData.eventType === 'offline' ?
                                                (formData.venue ? `${formData.venue}, ${formData.city || ''}` : 'Enter venue details') :
                                                'Select event type first'
                                        }
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Capacity:</strong>
                                    <span className="text-gray-600">{formData.totalSeats || '0'} attendees</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Regular Price:</strong>
                                    <span className="text-gray-600">₹{formData.regularPrice || '0'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Sale Price:</strong>
                                    <span className="text-gray-600">₹{formData.salePrice || '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {errors && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        <p className="font-medium">{errors}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                    >
                        <Save className="mr-2" size={20} />
                        {loading ? 'Creating Event...' : 'Create Event'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventsForm;