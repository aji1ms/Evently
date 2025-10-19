const EventShimmer = () => {
    return (
        <div className="px-4 lg:px-8 py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="mx-auto">
                <div className="space-y-6">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <div className="relative p-8">
                                <div className="flex flex-col lg:flex-row items-center gap-8">
                                    {/* Image section - shimmer */}
                                    <div className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl opacity-50"></div>
                                        <div className="relative w-40 h-32 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
                                        {/* Event type badge - shimmer */}
                                        <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gray-300 animate-pulse">
                                            <div className="w-12 h-4 bg-gray-400 rounded"></div>
                                        </div>
                                    </div>

                                    {/* Content section - shimmer */}
                                    <div className="flex-1 space-y-4 w-full">
                                        {/* Title shimmer */}
                                        <div className="space-y-2">
                                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-3/4"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-1/2"></div>
                                        </div>

                                        {/* Event details grid - shimmer */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[...Array(3)].map((_, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                                                >
                                                    <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
                                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse flex-1"></div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Description shimmer */}
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-5/6"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-4/6"></div>
                                        </div>

                                        {/* Bottom section - shimmer */}
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-24"></div>
                                            </div>

                                            {/* Button shimmer */}
                                            <div className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse">
                                                <div className="w-20 h-4 bg-gray-400 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventShimmer;