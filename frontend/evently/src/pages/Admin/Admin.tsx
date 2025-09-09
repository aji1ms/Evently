import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import AdminDashboard from "../../components/admin/Containers/Dashboard_Page/AdminDashboard";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";


const Admin = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} />
            <AdminDashboard />
        </div>
    )
}

export default Admin;
