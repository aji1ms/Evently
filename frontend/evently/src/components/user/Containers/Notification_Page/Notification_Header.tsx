import { Bell, Settings, House } from 'lucide-react';
import { useNavigate } from 'react-router';

const Notification_Header = () => {
    const navigate = useNavigate()
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                        <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-600">Stay updated</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors cursor-pointer" onClick={() => navigate("/")}>
                        <House className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors cursor-pointer">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notification_Header;
