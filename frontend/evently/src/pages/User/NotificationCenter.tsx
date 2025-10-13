import { Bell, Calendar } from 'lucide-react';
import Notification_Header from '../../components/user/Containers/Notification_Page/Notification_Header';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../Redux/store';
import { useEffect } from 'react';
import { fetchNotifications, markAllAsRead } from '../../Redux/slices/auth/authNotificationSlice';
import { formatDistanceToNow } from 'date-fns';
import NotificationPageShimmer from '../../components/user/ShimmerUI/NotificationPageShimmer';


const NotificationCenter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { notifications, loading } = useSelector((state: RootState) => state.authNotifications);

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [dispatch])

    if (loading) return <NotificationPageShimmer />

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateString: string) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };

    const handleMarkAll = () => {
        dispatch(markAllAsRead());
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Notification_Header />

                {/* Empty State*/}
                {!notifications.length ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications Yet</h3>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => {
                                return (
                                    <div
                                        key={notification?._id}
                                        className="p-4 hover:bg-gray-50">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {notification.title}
                                                        </h3>
                                                        <p className="text-md text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center space-x-4 mt-2">
                                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{formatDate(notification?.createdAt)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-1">
                                                        <span className="text-xs text-gray-500"> {getTimeAgo(notification.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleMarkAll}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                        Mark All as Read
                    </button>
                </div>
            </div>
        </div >
    );
};

export default NotificationCenter;
