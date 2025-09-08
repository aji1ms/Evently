import { Bot, User } from 'lucide-react';
import InputArea from '../../components/user/Containers/GPT_Page/InputArea';
import GPT_Header from '../../components/user/Containers/GPT_Page/GPT_Header';

const GPT = () => {
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <GPT_Header />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 max-w-3xl">
                            <div className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 shadow-lg">
                                <p className="text-sm leading-relaxed">Hello! I'm your AI assistant. How can I help you today?</p>
                            </div>
                            <p className="text-xs text-purple-200 mt-2 text-left">10:30 AM</p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 max-w-3xl text-right">
                            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white ml-auto shadow-lg">
                                <p className="text-sm leading-relaxed">Can you help me understand machine learning basics?</p>
                            </div>
                            <p className="text-xs text-purple-200 mt-2 text-right">10:31 AM</p>
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 max-w-3xl">
                            <div className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 shadow-lg">
                                <p className="text-sm leading-relaxed">Absolutely! Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. Think of it like teaching a computer to recognize patterns, similar to how humans learn from experience.</p>
                            </div>
                            <p className="text-xs text-purple-200 mt-2 text-left">10:31 AM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <InputArea />
        </div>
    );
};

export default GPT;