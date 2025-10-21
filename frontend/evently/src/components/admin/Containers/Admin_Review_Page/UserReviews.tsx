import React, { useEffect } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import RatingFilters from './RatingFilters';
import ReviewsList from './ReviewsList';
import StatsCard from '../Dashboard_Page/StatsCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchReviews } from '../../../../Redux/slices/admin/adminReviewSlice';
import ReviewPagination from './ReviewPagination';


const UserReviews: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { stats, loading, filters, pagination, reviews } = useSelector((state: RootState) => state.adminReviews)

    useEffect(() => {
        dispatch(fetchReviews({
            rating: filters.rating,
            dateFilter: filters.dateFilter,
            page: pagination.currentPage
        }))
    }, [dispatch, filters, pagination.currentPage]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80 w-full">
            <div className="mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Management</h1>
                    <p className="text-gray-600">Monitor and manage user reviews for your platform</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title='Total Reviews'
                        icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
                        value={stats?.totalReviews || 0}
                    />

                    <StatsCard
                        title='Average Rating'
                        icon={<Star className="w-6 h-6 text-yellow-600" />}
                        value={stats?.averageRating || 0}
                    />

                    <StatsCard
                        title='5 Star Reviews'
                        icon={<Star className="w-6 h-6 text-green-600" />}
                        value={stats?.fiveStarCount || 0}
                    />
                </div>

                {/* Filters */}
                <RatingFilters />

                {/* Reviews List */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading Reviews...</p>
                    </div>
                ) : (
                    <>
                        < ReviewsList reviewData={reviews} />
                        <ReviewPagination />
                    </>
                )}
            </div>
        </div>
    );
};

export default UserReviews;