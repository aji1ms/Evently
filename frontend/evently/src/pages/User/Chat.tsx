import InputArea from '../../components/user/Containers/GPT_Page/InputArea';
import Chat_Header from '../../components/user/Containers/GPT_Page/Chat_Header';

const GPT = () => {
    const messages = [
        {
            id: 1,
            user: 'Sarah Chen',
            avatar: 'SC',
            color: 'bg-pink-500',
            message: 'Hey everyone! Ready for the project meeting?',
            time: '10:30 AM',
        },
        {
            id: 2,
            user: 'You',
            avatar: 'ME',
            color: 'bg-blue-500',
            message: 'Yes! I\'ve prepared the presentation slides',
            time: '10:31 AM',
            isCurrentUser: true,
        },
        {
            id: 3,
            user: 'Mike Johnson',
            avatar: 'MJ',
            color: 'bg-orange-500',
            message: 'Perfect timing! I just finished the code review',
            time: '10:32 AM',
        },
        {
            id: 4,
            user: 'Emma Davis',
            avatar: 'ED',
            color: 'bg-teal-500',
            message: 'I\'ll share the design mockups in a minute',
            time: '10:33 AM',
        },
        {
            id: 5,
            user: 'Alex Kumar',
            avatar: 'AK',
            color: 'bg-purple-500',
            message: 'Great! Let\'s start in 5 minutes then',
            time: '10:34 AM',
        }
    ]
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <Chat_Header />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end space-x-2 ${msg.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                        >
                            <div className="relative flex-shrink-0">
                                <div className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center shadow-sm`}>
                                    <span className="text-white text-xs font-semibold">{msg.avatar}</span>
                                </div>
                            </div>
                            <div className={`flex flex-col max-w-md ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
                                {!msg.isCurrentUser && (
                                    <p className="text-gray-700 text-xs font-medium mb-1 px-1">{msg.user}</p>
                                )}
                                <div
                                    className={`px-4 py-2.5 rounded-2xl shadow-sm ${msg.isCurrentUser
                                        ? 'bg-blue-500 text-white rounded-br-md'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.message}</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 px-1">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Typing Indicator */}
            <div className="px-6 pb-2 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <p className="text-gray-500 text-xs">Emma is typing</p>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <InputArea />
        </div>
    );
};

export default GPT;