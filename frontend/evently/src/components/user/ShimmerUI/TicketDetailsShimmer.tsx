import { ArrowLeft } from 'lucide-react';

const TicketDetailsShimmer = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto p-6">
                {/* Back Button Shimmer */}
                <div className="flex items-center mb-6 animate-pulse">
                    <ArrowLeft className="w-5 h-5 text-gray-300 mr-2" />
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>

                {/* Header Section Shimmer */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 animate-pulse">
                    {/* Image Shimmer */}
                    <div className="relative h-64 bg-gray-200 overflow-hidden rounded-t-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-3"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                                        <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Shimmer */}
                    <div className="p-6 border-b">
                        <div className="flex items-start">
                            <div className="w-5 h-5 bg-gray-200 rounded mr-3 mt-1 flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Details Grid Shimmer */}
                    <div className="p-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-5 h-5 bg-gray-300 rounded mr-3 mt-1 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-5 h-5 bg-gray-300 rounded mr-3 mt-1 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-40"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ticket Information Shimmer */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-pulse">
                    {/* Section Header */}
                    <div className="flex items-center mb-6">
                        <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-40"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                                    </div>
                                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-4 bg-gray-300 rounded w-28"></div>
                                    </div>
                                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Button Shimmer */}
                <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Additional Info Shimmer */}
                <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailsShimmer;