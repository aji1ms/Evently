import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { validFullName } from '../../../../../utils/helper';
import toast from 'react-hot-toast';
import { createReview } from '../../../../Redux/slices/auth/authReviewSlice';

interface ReviewData {
    name: string;
    rating: number;
    comment: string;
}

const RateUs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.authReviews);
    const [error, setError] = useState<string>('');

    const [reviewData, setReviewData] = useState<ReviewData>({
        name: '',
        rating: 0,
        comment: ''
    });

    const [hoverRating, setHoverRating] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setReviewData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleStarClick = (rating: number) => {
        setReviewData(prev => ({
            ...prev,
            rating: rating
        }));
        if (error && rating > 0) setError('');
    };

    const handleStarHover = (rating: number) => {
        setHoverRating(rating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validFullName(reviewData.name)) {
            setError("Please enter a valid name (letters and spaces only)!");
            return;
        }

        if (reviewData.rating === 0) {
            setError("Please select a rating!");
            return;
        }

        if (!reviewData.comment.trim()) {
            setError("Please provide your feedback!");
            return;
        }

        if (reviewData.comment.trim().length < 10) {
            setError("Please provide more detailed feedback (at least 10 characters)!");
            return;
        }

        await dispatch(createReview(reviewData))

        setError("");

        setReviewData({
            name: '',
            rating: 0,
            comment: ''
        });

        toast.success("Thank you for your review!", { duration: 2000 });
    };

    const getStarColor = (starNumber: number) => {
        const currentRating = hoverRating || reviewData.rating;
        return starNumber <= currentRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300";
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Rate Us</h1>
                    <p className="text-xl text-slate-600">We value your feedback</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-3">
                                    Your Information
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    value={reviewData.name}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-4">
                                    Rate Your Experience
                                </label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="p-2 rounded-full hover:bg-blue-50 transition-all cursor-pointer transform hover:scale-110"
                                            onClick={() => handleStarClick(star)}
                                            onMouseEnter={() => handleStarHover(star)}
                                            onMouseLeave={handleStarLeave}
                                        >
                                            <Star
                                                className={`w-12 h-12 transition-colors duration-200 ${getStarColor(star)}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-center mt-2 text-slate-600">
                                    {reviewData.rating > 0
                                        ? `You rated: ${reviewData.rating} star${reviewData.rating > 1 ? 's' : ''}`
                                        : 'Click to rate'
                                    }
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-3">
                                Your Feedback
                            </label>
                            <textarea
                                value={reviewData.comment}
                                rows={8}
                                name='comment'
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none text-lg"
                                placeholder="Tell us about your experience in detail..."
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                {reviewData.comment.length}/500 characters
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RateUs;