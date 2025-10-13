import { Camera, Edit3, Lock, Mail, Phone, Save, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../../../Redux/slices/auth/authSlice";
import type { RootState, AppDispatch } from "../../../../Redux/store";
import toast, { Toaster } from "react-hot-toast";
import { validFullName, validatePhone } from "../../../../../utils/helper";

const ProfileDetail: React.FC = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState({
        name: "",
        phone: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
            });
            setPreview(user.avatar || null);
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {
            name: "",
            phone: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!validFullName(formData.name)) {
            newErrors.name = "Name should contain only letters and spaces";
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number starting with 6-9";
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.phone;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name.trim());

            if (formData.phone) {
                submitData.append('phone', formData.phone);
            }

            if (selectedFile) {
                submitData.append('avatar', selectedFile);
            }

            await dispatch(updateProfile(submitData)).unwrap();
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            setSelectedFile(null);
            setErrors({ name: "", phone: "" });
        } catch (error: any) {
            toast.error(error || "Failed to update profile");
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
            });
            setPreview(user.avatar || null);
        }
        setIsEditing(false);
        setSelectedFile(null);
        setErrors({ name: "", phone: "" });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            toast.error("Image size should be less than 3MB");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setSelectedFile(file);
    };

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <Toaster position="top-right" />
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                            >
                                <Edit3 className="w-4 h-4" /> Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors
                                    cursor-pointer"
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                    />
                                ) : user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                {isEditing && (
                                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                                        <Camera className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {isEditing ? formData.name : user?.name}
                                </h3>
                                <p className="text-gray-600">{user?.email}</p>
                                {selectedFile && (
                                    <p className="text-sm text-green-600 mt-1">New image selected</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User className="w-4 h-4" /> Full Name
                                </label>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="bg-gray-50 px-3 py-2 rounded-lg text-gray-800">{user?.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                <p className="bg-gray-50 px-3 py-2 rounded-lg text-gray-800">{user?.email}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Phone className="w-4 h-4" /> Phone
                                </label>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="bg-gray-50 px-3 py-2 rounded-lg text-gray-800">
                                        {user?.phone || "Not provided"}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Lock className="w-4 h-4" /> Password
                                </label>
                                <p className="bg-gray-50 px-3 py-2 rounded-lg text-gray-800">••••••••</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;