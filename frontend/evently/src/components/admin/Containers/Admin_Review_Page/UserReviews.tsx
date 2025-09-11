import React from 'react';
import { Star, Calendar, TrendingUp, Users } from 'lucide-react';
import RatingFilters from './RatingFilters';
import RatingDistribution from './RatingDistribution';
import ReviewsList from './ReviewsList';
import StatsCard from '../Dashboard_Page/StatsCard';


const UserReviews: React.FC = () => {
    return (
        <div className="flex-1 min-h-screen bg-gray-50 p-6 md:ml-80">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Management</h1>
                    <p className="text-gray-600">Monitor and manage user reviews for your platform</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <StatsCard
                        title='Total Reviews'
                        icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
                        value={5}
                    />

                    <StatsCard
                        title='Average Rating'
                        icon={<Star className="w-6 h-6 text-yellow-600" />}
                        value={3.8}
                    />

                    <StatsCard
                        title='5 Star Reviews'
                        icon={<Star className="w-6 h-6 text-green-600" />}
                        value={5}
                    />

                    <StatsCard
                        title='This Month'
                        icon={<Calendar className="w-6 h-6 text-purple-600" />}
                        value={5}
                    />

                    <StatsCard
                        title='Total Reviews'
                        icon={<Users className="w-6 h-6 text-purple-600" />}
                        value={100}
                    />
                </div>

                {/* Rating Distribution */}
                <RatingDistribution />

                {/* Filters */}
                <RatingFilters />

                {/* Reviews List */}
                <ReviewsList />
            </div>
        </div>
    );
};

export default UserReviews;