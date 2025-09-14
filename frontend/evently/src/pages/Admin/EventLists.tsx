import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import AllEvents from "../../components/admin/Containers/AllEvent_List_Page/AllEvents";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";

const EventList = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            <AllEvents />
        </div>
    )
}

export default EventList;
