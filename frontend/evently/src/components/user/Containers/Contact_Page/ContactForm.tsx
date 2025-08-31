import React, { useState } from 'react';
import { validateEmail, validateSubject, validFullName } from '../../../../../utils/helper';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm = () => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validFullName(formData.name)) {
            setError("Name should contain only letters and spaces");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("please enter a valid email address");
            return;
        }

        if (!validateSubject(formData.subject)) {
            setError('Subject can contain letters and spaces only');
            return;
        }

        if (formData.message == '') {
            setError('Message must have at least 10 sentences');
            return;
        }

        setError('');
        console.log(formData)
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    }

    return (
        <div className="bg-slate-900 p-8 w-full">
            <div className="mb-8">
                <h2 className="text-white text-lg font-medium mb-2">Contact Us</h2>
                <h1 className="text-white text-3xl font-bold">Send Message Any Time</h1>
            </div>

            <div className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-full bg-slate-700 text-white placeholder-slate-400 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-full bg-slate-700 text-white placeholder-slate-400 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full bg-slate-700 text-white placeholder-slate-400 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Message */}
                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-700 text-white placeholder-slate-400 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                </div>
                {error && (
                    <p className='text-red-500 text-sm font-medium'>
                        {error}
                    </p>
                )}
                {/* Submit Button */}
                <div>
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-slate-700 text-white rounded-full hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;