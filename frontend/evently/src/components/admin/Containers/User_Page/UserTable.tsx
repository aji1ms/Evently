import { useDispatch } from "react-redux";
import type { AppDispatch } from '../../../../Redux/store';
import { editUserStatus, editUser } from '../../../../Redux/slices/admin/adminUsersSlice';
import { Mail, Phone, Shield, ShieldOff, Users, UserRoundPen } from 'lucide-react';
import type { User } from "../../../../Redux/slices/admin/adminUsersSlice";
import toast from 'react-hot-toast';
import ToastCustomAlert from "../../../user/Inputs/ToastCustomAlert";

interface UsersData {
    userDatas: User[]
}

const UserTable = ({ userDatas }: UsersData) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleToggleBlock = (id: string, currentStatus: boolean) => {
        const action = currentStatus ? "unblock" : "block";
        ToastCustomAlert(
            `Are you sure you want to ${action} this user?`,
            () => {
                dispatch(editUserStatus({ userId: id, isBlocked: !currentStatus }))
                    .unwrap()
                    .then(() => toast.success(`User ${action}ed successfully!`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        );
    };

    const handleEditUser = (id: string, currentStatus: boolean, role: string) => {
        const action = currentStatus ? 'user' : 'admin';
        const newRole = role === "admin" ? "user" : "admin";
        ToastCustomAlert(
            `Are you sure you want to make this person as ${action}?`,
            () => {
                dispatch(editUser({ userId: id, isAdmin: !currentStatus, role: newRole }))
                    .unwrap()
                    .then(() => toast.success("User edited sucessfully!", { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        )
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
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
                        {userDatas.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">

                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-sm font-semibold text-blue-600">
                                                {(user.avatar && user.avatar !== "" ? user.avatar : user.name?.slice(0, 2)?.toUpperCase()) || "NA"}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-600">ID: {user._id}</div>
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
                                         ${user.isBlocked == false ? "bg-green-200" : "bg-red-200"}`}>
                                        {user.isBlocked == false ? "Active" : "Blocked"}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                        ${user.isAdmin ? "bg-yellow-200" : "bg-purple-300"}`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    <div className="text-gray-900">{user.bookings?.length || 0} bookings</div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className={`p-2 rounded-lg text-sm font-medium ${user.isBlocked
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                } cursor-pointer`}
                                            title={user.isBlocked === true ? 'Unblock User' : 'Block User'}
                                            onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                                        >
                                            {user.isBlocked ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                                        </button>

                                        <button className="p-2 text-gray-600 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer"
                                            title={user.isAdmin ? 'Admin' : 'User'}
                                            onClick={() => handleEditUser(user._id, user.isAdmin, user.role)}
                                        >
                                            <UserRoundPen className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {userDatas.length === 0 && (
                <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No users found</h3>
                </div>
            )}
        </div>
    )
}

export default UserTable
