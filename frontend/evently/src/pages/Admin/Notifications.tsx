import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import NotificationForm from "../../components/admin/Containers/Notification_Page/NotificationForm";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Notifications = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />

            <div className="flex-1 bg-gray-50 p-6 md:ml-80">
                <div className="w-full ">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                        <p className="text-gray-600">Send notifications to all users</p>
                    </div>

                    {/*Notification Form */}
                    <NotificationForm />
                </div>
            </div>
        </div>
    )
}

export default Notifications;
