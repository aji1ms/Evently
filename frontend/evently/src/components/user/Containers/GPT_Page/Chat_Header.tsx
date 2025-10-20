import { Home, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

const GPT_Header = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="bg-blue-500 p-3 rounded-xl shadow-md">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h1 className="text-gray-900 text-lg font-semibold">Community Chat</h1>
                        <p className="text-sm text-gray-600">Connect with everyone in the community</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="hover:bg-gray-100 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer" onClick={() => navigate("/")}>
                        <Home className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GPT_Header;
