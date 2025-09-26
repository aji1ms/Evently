import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import AnalyticsDashboard from "../../components/admin/Containers/Admin_Report_Page/AnalyticsDashboard";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Reports = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <AnalyticsDashboard />
        </div>
    )
}

export default Reports;
