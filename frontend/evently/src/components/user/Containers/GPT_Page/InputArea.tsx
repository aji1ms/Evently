import { Send } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';


interface InputAreaProps {
    onSendMessage: (message: string) => void;
    onTyping: (isTyping: boolean) => void;
}

const InputArea = ({ onSendMessage, onTyping }: InputAreaProps) => {
    const [message, setMessage] = useState('');
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleTyping = useCallback((value: string) => {
        setMessage(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        if (value.length > 0) {
            onTyping(true);

            typingTimeoutRef.current = setTimeout(() => {
                onTyping(false);
            }, 1000);
        } else {
            onTyping(false);
        }
    }, [onTyping]);

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
            onTyping(false);
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end space-x-3">
                    <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => handleTyping(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message to the community..."
                            className="w-full bg-transparent text-gray-900 placeholder-gray-400 px-4 py-3 outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mb-1"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputArea;
