import React from 'react';
import { Bell, Calendar, Settings } from 'lucide-react';

const Notifications: React.FC = () => {
    const notifications = [
        {
            id: 3,
            type: 'success',
            title: 'Event Approved',
            message: 'Great news! Your event "Food Carnival" has been approved and listed.',
            eventName: 'Food Carnival',
            time: '1 hour ago',
            read: true,
            color: 'green'
        },
        {
            id: 6,
            type: 'success',
            title: 'Event Successfully Listed',
            message: 'Your event "Workshop: Digital Marketing" is now visible to attendees.',
            eventName: 'Workshop: Digital Marketing',
            time: '2 days ago',
            read: true,
            color: 'green'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                                <p className="text-gray-600">Stay updated</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Empty State*/}
                {!notifications.length ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications Yet</h3>
                        <p className="text-gray-600">When you list events, you'll see notifications here.</p>
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
                                        key={notification.id}
                                        className="p-4 hover:bg-gray-50">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-semibold text-gray-900">
                                                            {notification.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center space-x-4 mt-2">
                                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{notification.eventName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-1">
                                                        <span className="text-xs text-gray-500">{notification.time}</span>
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Mark All as Read
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                        Clear All
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Notifications;
