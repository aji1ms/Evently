import { X } from "lucide-react"
import { useEffect, useState } from "react";
import { validFullName } from "../../../../utils/helper";

interface AddNotificationProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (NotificationData: NotificationFormData) => void;
    initialData?: NotificationFormData;
    isEdit?: boolean;
}

export interface NotificationFormData {
    title: string;
    message: string;
}

const NotificationModal: React.FC<AddNotificationProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}) => {
    const [formData, setFormData] = useState<NotificationFormData>({
        title: "",
        message: '',
    });

    const [err, setErr] = useState('');

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(initialData);
        }
    }, [isEdit, initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validFullName(formData.title)) {
            setErr("TItle should contain only letters and spaces!");
            return;
        }

        if (formData.message == "") {
            setErr("Message cannot be empty!");
            return;
        }

        onSubmit(formData);
        handleClose()
    }

    const handleClose = () => {
        onClose()
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEdit ? "Edit Notification" : "Create New Notification"}
                    </h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={handleClose}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Notification Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter notification title"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Enter notification message"
                            />
                        </div>
                    </div>
                    {err && (
                        <p className='text-red-500 text-md font-medium'>
                            {err}
                        </p>
                    )}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {isEdit ? "Update Notification" : "Create Notification"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationModal
