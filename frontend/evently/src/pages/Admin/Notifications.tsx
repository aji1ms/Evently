import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Notifications = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} />
            Notifications
        </div>
    )
}

export default Notifications;
