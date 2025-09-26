import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import UserManagement from "../../components/admin/Containers/User_Page/UserManagement";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Users = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <UserManagement />
        </div>
    )
}

export default Users;
