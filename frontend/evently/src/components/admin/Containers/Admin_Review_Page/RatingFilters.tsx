import { Calendar, Filter, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { useEffect } from 'react';
import { fetchReviews, setDateFilter, setRating, clearFilters } from '../../../../Redux/slices/admin/adminReviewSlice';

const RatingFilters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { filters, pagination } = useSelector((state: RootState) => state.adminReviews);

    useEffect(() => {
        dispatch(fetchReviews({
            dateFilter: filters.dateFilter,
            rating: filters.rating,
            page: pagination.currentPage
        }));
    }, [dispatch, filters.dateFilter, filters.rating, pagination.currentPage])

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setDateFilter(e.target.value));
    }

    const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setRating(e.target.value));
    }

    const handleClearFilters = () => {
        dispatch(clearFilters());
    }

    const hasActiveFilters = filters.dateFilter !== 'all' || filters.rating !== 'all';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Reviews List</h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Time Filter */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <select
                            value={filters.dateFilter}
                            onChange={handleDateFilterChange}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="all">All Time</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>

                    {/* Rating Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filters.rating}
                            onChange={handleRatingFilterChange}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>

                    {hasActiveFilters && (
                        <button
                            onClick={handleClearFilters}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-red-200 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RatingFilters