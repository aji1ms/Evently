import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";


const Admin = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} />
            admin
        </div>
    )
}

export default Admin;
