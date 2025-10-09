import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';

const PaymentSuccessAnimation: React.FC = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            navigate("/tickets")
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
            <div className="text-center">
                <div className={`mx-auto mb-6 transition-all duration-700 ease-out ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                    <div className="relative inline-block">
                        <div className={`absolute inset-0 rounded-full bg-green-400 ${show ? 'animate-ping' : ''
                            }`} style={{ animationDuration: '1.5s', animationIterationCount: '1' }}></div>

                        <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-6 shadow-2xl">
                            <Check className="w-16 h-16 text-white" strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className={`transition-all duration-700 delay-300 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Thank You!
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Your booking is confirmed
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecting to your booking...
                    </p>
                </div>

                {/* Loading dots */}
                <div className={`flex justify-center gap-2 mt-8 transition-all duration-700 delay-500 ${show ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessAnimation;