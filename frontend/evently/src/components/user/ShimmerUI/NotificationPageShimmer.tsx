import Notification_Header from "../Containers/Notification_Page/Notification_Header";

const NotificationPageShimmer = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                <Notification_Header />
                {/* Content Shimmer */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Title */}
                                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                {/* Message */}
                                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                                                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-3"></div>
                                                {/* Date */}
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                                                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-1">
                                                {/* Time ago */}
                                                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button Shimmer */}
                <div className="flex justify-center space-x-4 mt-6">
                    <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPageShimmer;