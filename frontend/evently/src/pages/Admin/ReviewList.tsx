import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import UserReviews from "../../components/admin/Containers/Admin_Review_Page/UserReviews";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Reviews = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} role="admin" />
            <UserReviews />
        </div>
    )
}

export default Reviews;
