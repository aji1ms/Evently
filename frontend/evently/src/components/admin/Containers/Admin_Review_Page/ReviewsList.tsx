import { useState } from "react";
import { Trash2, Star } from 'lucide-react';

interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: Date;
}

const ReviewsList = () => {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            userName: 'John Smith',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            rating: 5,
            comment: 'Excellent platform! Very user-friendly and feature-rich.',
            date: new Date('2024-09-10'),
        },
        {
            id: '2',
            userName: 'Sarah Johnson',
            userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b047?w=40&h=40&fit=crop&crop=face',
            rating: 4,
            comment: 'Good service overall, but could improve loading speeds.',
            date: new Date('2024-09-08'),
        },
        {
            id: '3',
            userName: 'Mike Chen',
            userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            rating: 3,
            comment: 'Average experience. Some features are confusing to navigate.',
            date: new Date('2024-09-05'),
        },
        {
            id: '4',
            userName: 'Emily Davis',
            userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            rating: 5,
            comment: 'Love the new updates! Everything works smoothly now.',
            date: new Date('2024-08-28'),
        },
        {
            id: '5',
            userName: 'David Wilson',
            userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
            rating: 2,
            comment: 'Had issues with customer support. Response time was slow.',
            date: new Date('2024-08-15'),
        },
    ]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-4">
            {reviews.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
                    <p className="text-gray-500 text-lg">No reviews found yet.</p>
                </div>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <img
                                    src={review.userAvatar}
                                    alt={review.userName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                                        {renderStars(review.rating)}
                                        <span className="text-sm text-gray-500">
                                            {formatDate(review.date)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            </div>
                            <button
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete review"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ReviewsList
