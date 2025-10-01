import { Bell, Edit2, Trash2 } from 'lucide-react'
import { deleteNotification, editNotificationData, type Notification } from '../../../../Redux/slices/admin/adminNotificationSlice'
import { useState } from 'react';
import NotificationModal, { type NotificationFormData } from '../../../user/Inputs/NotificationModal';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../Redux/store';
import toast from 'react-hot-toast';
import ToastCustomAlert from '../../../user/Inputs/ToastCustomAlert';

interface NotificationData {
    notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationData) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editNotification, setEditNotification] = useState<Notification | null>(null);

    const handleEditNotification = (notification: Notification) => {
        setEditNotification(notification)
        setIsModalOpen(true)
    }

    const handleUpdateNotification = (data: NotificationFormData) => {
        if (!editNotification) return;
        dispatch(
            editNotificationData({
                notificationId: editNotification._id,
                title: data.title,
                message: data.message,
            })
        )
            .unwrap()
            .then(() => toast.success("Notification updated successfully"))
            .catch((err) => toast.error(err));
    }

    const handleDelete = (id: string) => {
        ToastCustomAlert(
            `Are you sure to delete this notification?`,
            () => {
                dispatch(deleteNotification(id)).unwrap()
                    .then(() => toast.success(`Category deleted successfully`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        )
    }

    return (
        <div className="space-y-4">
            {notifications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No notifications found</p>
                    <p className="text-gray-400 mt-2">Click "Create Notification" to send one</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {notifications.map((notification) => (
                                    <tr key={notification._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {notification.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-md">
                                                {notification.message}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                    onClick={() => handleEditNotification(notification)}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Delete"
                                                    onClick={() => handleDelete(notification._id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <NotificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdateNotification}
                initialData={{
                    title: editNotification?.title || '',
                    message: editNotification?.message || ''
                }}
                isEdit={true}
            />
        </div>
    )
}

export default NotificationList