import { Plus, Bell, } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import NotificationList from './NotificationList';
import NotificationModal, { type NotificationFormData } from '../../../user/Inputs/NotificationModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { createNotification, fetchAllNotifications } from '../../../../Redux/slices/admin/adminNotificationSlice';
import NotifactionSearch from './NotifactionSearch';
import toast from 'react-hot-toast';
import NotificationPagination from './NotificationPaginations';

const NotificationManagement = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { notifications, error, loading, pagination } = useSelector((state: RootState) => state.adminNotifications);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchAllNotifications({}));
    }, [dispatch]);

    const handleAddNotification = async (notificationData: NotificationFormData) => {
        try {
            await dispatch(createNotification(notificationData)).unwrap();
            toast.success(`Notification created successfully!`, { duration: 2000 });
            dispatch(fetchAllNotifications({}));
            setIsModalOpen(false);
        } catch (err: any) {
            toast.error(error, { duration: 2000 });
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80 w-full">
            <div className="mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Notification Management</h1>
                                <p className="text-gray-600 mt-1">Create and manage system notifications</p>
                            </div>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={20} />
                            Create Notification
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Notification"
                        value={pagination.totalNotifications || 0}
                        icon={<Bell className="w-6 h-6 text-blue-600" />}
                    />
                </div>
                {/* Notifications Searchbar */}
                <NotifactionSearch />

                {/* Notifications List */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading users...</p>
                    </div>
                ) : (
                    <>
                        <NotificationList notifications={notifications} />
                        <NotificationPagination />
                    </>
                )}
            </div>

            {/* Modal */}
            <NotificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddNotification}
            />
        </div>
    );
}

export default NotificationManagement;