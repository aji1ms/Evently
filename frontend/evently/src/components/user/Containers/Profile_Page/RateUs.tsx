import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewData {
    name: string;
    rating: number;
    description: string;
}

const RateUs: React.FC = () => {
    const [reviewData, setReviewData] = useState<ReviewData>({
        name: '',
        rating: 0,
        description: ''
    });

    return (
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Rate Us</h1>
                    <p className="text-xl text-slate-600">We value your feedback</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-3">Your Information</label>
                                <input
                                    type="text"
                                    value={reviewData.name}
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-4">Rate Your Experience</label>
                                <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="p-2 rounded-full hover:bg-blue-50 transition-all"
                                        >
                                            <Star
                                                className="w-12 h-12"
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-center mt-2 text-slate-600">
                                    Click to rate
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-3">Your Feedback</label>
                            <textarea
                                value={reviewData.description}
                                rows={8}
                                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none text-lg"
                                placeholder="Tell us about your experience in detail..."
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RateUs;