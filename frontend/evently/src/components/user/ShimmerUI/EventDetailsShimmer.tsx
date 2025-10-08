import Footer from "../Containers/Footer";
import Header from "../Containers/Header";

const EventDetailsShimmer = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Event Type Badge Shimmer */}
                <div className="mb-6">
                    <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Title Section Shimmer */}
                <div className="mb-8">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4 w-3/4"></div>
                    <div className="flex items-center gap-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    </div>
                </div>

                {/* Event Image Shimmer */}
                <div className="mb-12 rounded-2xl overflow-hidden bg-gray-200 animate-pulse" style={{ aspectRatio: '474/214' }}></div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* About Section Shimmer */}
                        <div>
                            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 w-48"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse mt-4"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>

                        {/* Event Details Grid Shimmer */}
                        <div>
                            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-6 w-32"></div>
                            <div className="space-y-6">
                                {/* Date & Time Shimmer */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-20"></div>
                                        <div className="h-5 bg-gray-200 rounded animate-pulse mb-1 w-40"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                    </div>
                                </div>

                                {/* Location Shimmer */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-16"></div>
                                        <div className="h-5 bg-gray-200 rounded animate-pulse mb-1 w-32"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Shimmer */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Booking Card Shimmer */}
                            <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b border-gray-200">
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                                            <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                                        </div>
                                        <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                                </div>

                                {/* CTA Button Shimmer */}
                                <div className="p-6">
                                    <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>

                            {/* Organizer Card Shimmer */}
                            <div className="mt-6 p-6 border border-gray-200 rounded-2xl">
                                <div className="h-3 bg-gray-200 rounded animate-pulse mb-3 w-24"></div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetailsShimmer;