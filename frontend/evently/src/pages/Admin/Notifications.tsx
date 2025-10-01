import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import NotificationManagement from "../../components/admin/Containers/Notification_Page/NotificationManagement";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Notifications = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <div className="flex-1">
                <NotificationManagement />
            </div>
        </div>
    )
}

export default Notifications;
