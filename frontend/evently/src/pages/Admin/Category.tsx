import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import CategoryManagement from "../../components/admin/Containers/Category_Management/CategoryManagement";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Category = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <div className="flex-1">
                <CategoryManagement />
            </div>
        </div>
    )
}

export default Category;
