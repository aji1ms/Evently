import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import AllTicketBookings from "../../components/admin/Containers/Booking_Management/AllTicketBookings";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const Bookings = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            <AllTicketBookings />
        </div>
    )
}

export default Bookings;
