import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Image, Save, Ticket, Building2, Monitor, Navigation, Home } from 'lucide-react';

interface EventFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    eventType: 'online' | 'offline' | '';
    venue: string;
    address: string;
    city: string;
    state: string;
    link: string;
    image: string;
    capacity: string;
    regularPrice: string;
    salePrice: string;
}

const AddEventsForm = () => {
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        date: '',
        time: '',
        eventType: '',
        venue: '',
        address: '',
        city: '',
        state: '',
        link: '',
        image: '',
        capacity: '',
        regularPrice: '',
        salePrice: ''
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }

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

                        {/* Event Type */}
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
                                    Regular Price
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
                                    Sale Price
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

                        {/* Conditional Location/Link Fields */}
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
                        <div>
                            <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-2">
                                <Users className="inline mr-2" size={16} />
                                Event Capacity *
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Maximum number of attendees"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                                <Image className="inline mr-2" size={16} />
                                Event Image
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Enter image URL"
                            />
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
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Type:</strong>
                                    <span className="text-gray-600">
                                        {formData.eventType === 'online' ? '🌐 online' :
                                            formData.eventType === 'offline' ? '📍 offline' : 'Select event type'}
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
                                    <span className="text-gray-600">{formData.capacity || '0'} attendees</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Regular Price:</strong>
                                    <span className="text-gray-600">${formData.regularPrice || '0'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-28 flex-shrink-0">Sales Price:</strong>
                                    <span className="text-gray-600">${formData.salePrice || '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        <Save className="mr-2" size={20} />
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventsForm;