import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Bookings = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            Bookings
        </div>
    )
}

export default Bookings;
