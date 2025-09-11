import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";


const EventList = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            Events
        </div>
    )
}

export default EventList;
