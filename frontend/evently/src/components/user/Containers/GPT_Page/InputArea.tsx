import { Send } from 'lucide-react';

const InputArea = () => {
    return (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end space-x-3">
                    <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full bg-transparent text-gray-900 placeholder-gray-400 px-4 py-3 outline-none"
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-1"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputArea;
