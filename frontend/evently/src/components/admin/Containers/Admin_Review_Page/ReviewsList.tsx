import { Trash2, Star } from 'lucide-react';
import { deleteReview, fetchReviews, type ReviewData } from "../../../../Redux/slices/admin/adminReviewSlice";
import ToastCustomAlert from '../../../user/Inputs/ToastCustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import toast from 'react-hot-toast';

interface AllReviews {
    reviewData: ReviewData[];
}

const ReviewsList = ({ reviewData }: AllReviews) => {
    const dispatch = useDispatch<AppDispatch>();
    const { filters, pagination } = useSelector((state: RootState) => state.adminReviews);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDelete = (reviewId: string) => {
        ToastCustomAlert(
            `Are you sure to delete this review?`,
            async () => {
                await dispatch(deleteReview(reviewId)).unwrap()
                    .then(() => toast.success(`review deleted successfully`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));

                dispatch(fetchReviews({
                    dateFilter: filters.dateFilter,
                    rating: filters.rating,
                    page: pagination.currentPage
                }));
            }
        )
    }

    return (
        <div className="space-y-4">
            {reviewData.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
                    <p className="text-gray-500 text-lg">No reviews found yet.</p>
                </div>
            ) : (
                reviewData.map((review) => (
                    <div key={review?._id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <img
                                    src={review?.user?.avatar}
                                    alt={review?.user?.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{review?.user?.name}</h3>
                                        {renderStars(review?.rating)}
                                        <span className="text-sm text-gray-500">
                                            {formatDate(review?.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            </div>
                            <button
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete review"
                                onClick={() => handleDelete(review?._id)}
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
