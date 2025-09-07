import { Camera, Edit3, Lock, Mail, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    password: string;
    profilePicture: string;
}

const mockUser: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    password: "********",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
};

const ProfileDetail: React.FC = () => {
    const [user, setUser] = useState<UserProfile>(mockUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<UserProfile>(mockUser);

    const handleEdit = () => {
        setEditedUser(user);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
        console.log('Profile updated:', editedUser);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        setEditedUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (isEditing) {
                    handleInputChange('profilePicture', result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                                <img
                                    src={isEditing ? editedUser.profilePicture : user.profilePicture}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                />
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
                                    {isEditing ? editedUser.name : user.name}
                                </h3>
                                <p className="text-gray-600">{isEditing ? editedUser.email : user.email}</p>
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{user.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{user.email}</p>
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={editedUser.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{user.phone}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Lock className="w-4 h-4" />
                                    Password
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                    >
                                    </button>
                                </div>
                                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">••••••••</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProfileDetail;
