import { X } from "lucide-react"
import { useEffect, useState } from "react";
import { validFullName } from "../../../../utils/helper";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (categoryData: CategoryFormData) => void;
    initialData?: CategoryFormData;
    isEdit?: boolean;
}

export interface CategoryFormData {
    name: string;
    description: string;
}

const CategoryModal: React.FC<AddCategoryModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}) => {
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: ''
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

        if (!validFullName(formData.name)) {
            setErr("TItle should contain only letters and spaces!");
            return;
        }

        if (formData.description == "") {
            setErr("Description cannot be empty!");
            return;
        }

        onSubmit(formData);
        handleClose()
    }

    const handleClose = () => {
        setFormData({
            name: '',
            description: ''
        });
        setErr('');
        onClose();
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEdit ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        onClick={handleClose}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter category name"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description * </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Enter category description"
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
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal;
