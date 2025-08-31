import { Send } from 'lucide-react';

const InputArea = () => {
    return (
        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 p-2">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        className="flex-1 bg-transparent text-white placeholder-purple-200 px-4 py-2 outline-none"
                    />
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-purple-200 text-xs text-center mt-2">
                    Press Enter to send • Shift + Enter for new line
                </p>
            </div>
        </div>
    )
}

export default InputArea;
