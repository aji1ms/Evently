import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Users = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
        </div>
    )
}

export default Users;
