import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ToastCustomAlert = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
) => {
    toast.custom((t) => (
        <div className={`bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-md w-full mx-4
                         ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
            <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Confirm Action
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex space-x-3">
                <button
                    onClick={() => {
                        onCancel?.();
                        toast.dismiss(t.id);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-medium transition-colors border border-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        toast.dismiss(t.id);
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm"
                >
                    Yes, Confirm
                </button>
            </div>
        </div>
    ));
};

export default ToastCustomAlert;