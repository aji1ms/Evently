import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Image, Save } from 'lucide-react';


interface EventFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    capacity: string;
}

const AddEventsForm = () => {
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        image: '',
        capacity: ''
    });

    const [errors, setErrors] = useState("Input Areas Cannot Be Empty")

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
            <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/*Left Column */}
                    <div className="space-y-6">
                        {/* Event Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
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
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-noneborder-gray-300 focus:border-blue-500"
                                placeholder="Describe your event in detail..."
                            />
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
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Venue */}
                        <div>
                            <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="inline mr-2" size={16} />
                                Venue *
                            </label>
                            <input
                                type="text"
                                id="venue"
                                name="venue"
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Enter venue location"
                            />
                        </div>

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
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 focus:border-blue-500"
                                placeholder="Maximum number of attendees"
                                min="1"
                            />
                        </div>
                    </div>

                    {/*Right Column */}
                    {/* - Image Upload */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Image className="inline mr-2" size={16} />
                                Event Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <div className="py-12">
                                    <Image className="mx-auto mb-4 text-gray-400" size={48} />
                                    <p className="text-gray-600 mb-2">Upload event image</p>
                                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                                >
                                    Choose Image
                                </label>
                            </div>
                        </div>

                        {/* Event Preview Card */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Preview</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-20 flex-shrink-0">Title:</strong>
                                    <span className="text-gray-600">{formData.title || 'Event title will appear here'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-20 flex-shrink-0">Date:</strong>
                                    <span className="text-gray-600">{formData.date || 'Select date'} {formData.time && `at ${formData.time}`}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-20 flex-shrink-0">Venue:</strong>
                                    <span className="text-gray-600">{formData.venue || 'Enter venue'}</span>
                                </div>
                                <div className="flex items-start">
                                    <strong className="text-gray-700 w-20 flex-shrink-0">Capacity:</strong>
                                    <span className="text-gray-600">{formData.capacity || '0'} attendees</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {errors && <p className="flex justify-center mt-1 text-lg font-medium text-red-600 bg-red-100 py-2">{errors}</p>}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                    >
                        <Save className="mr-2" size={20} />
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEventsForm;