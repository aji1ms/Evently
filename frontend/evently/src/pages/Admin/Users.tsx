import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Users = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} />
            Users
        </div>
    )
}

export default Users;
