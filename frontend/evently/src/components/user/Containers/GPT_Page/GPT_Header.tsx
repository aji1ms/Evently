import { Sparkles, Trash2 } from 'lucide-react';

const GPT_Header = () => {
    return (
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold">AI Assistant</h1>
                        <p className="text-purple-200 text-sm">Your intelligent companion</p>
                    </div>
                </div>
                <button className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-full transition-all">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default GPT_Header;
