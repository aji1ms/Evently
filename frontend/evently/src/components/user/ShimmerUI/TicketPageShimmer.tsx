const TicketPageShimmer = () => {
    return (
        <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Shimmer */}
                <div className="mb-6">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                </div>

                {/* Tickets Grid Shimmer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow animate-pulse">
                            {/* Image & Status Shimmer */}
                            <div className="relative h-32 bg-gray-200 rounded-t-lg overflow-hidden">
                                <div className="absolute top-2 right-2">
                                    <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="h-5 bg-gray-200 rounded mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

                                {/* Event Details Shimmer */}
                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-40"></div>
                                    </div>
                                </div>

                                {/* Ticket Info Shimmer */}
                                <div className="bg-gray-50 rounded p-3 space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                        <div className="h-3 bg-gray-200 rounded w-8"></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Number Shimmer */}
                                <div className="mt-3 flex items-center">
                                    <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>

                                {/* Button Shimmer */}
                                <div className="w-full mt-3 h-9 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketPageShimmer;