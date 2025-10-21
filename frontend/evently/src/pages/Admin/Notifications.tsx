import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import NotificationManagement from "../../components/admin/Containers/Notification_Page/NotificationManagement";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Notifications = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <NotificationManagement />
        </div>
    )
}

export default Notifications;
