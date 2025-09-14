import { Edit, Mail, Phone, Shield, ShieldOff, Users } from 'lucide-react'
import type { User } from './UserManagement'

interface UsersData {
    mockUsers: User[]
}

const UserTable = ({ mockUsers }: UsersData) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Users (6)
                    </h3>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stats</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">

                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-sm font-semibold text-blue-600">{user.avatar}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-600">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="flex items-center text-gray-900">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            {user.email}
                                        </div>
                                        <div className="flex items-center text-gray-600 mt-1">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            {user.phone}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                         ${user.status == "active" ? "bg-green-200" : "bg-red-200"}`}>
                                        {user.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                        ${user.role == "admin" ? "bg-yellow-200" : "bg-purple-300"}`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    <div className="text-gray-900">{user.totalBookings} bookings</div>
                                    <div className="text-gray-600">${user.totalSpent} spent</div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className={`p-2 rounded-lg text-sm font-medium ${user.status === 'blocked'
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            title={user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                                        >
                                            {user.status === 'blocked' ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                                        </button>

                                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50" title="Edit User">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {mockUsers.length === 0 && (
                <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No users found</h3>
                </div>
            )}
        </div>
    )
}

export default UserTable
