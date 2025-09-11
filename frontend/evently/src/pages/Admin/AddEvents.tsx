import { SIDE_ADMIN_DATA } from "../../../utils/Data";
import AddEventsForm from "../../components/admin/Containers/Admin_Events_Page/AddEventsForm";
import SideMenu from "../../components/user/Containers/Profile_Page/SideMenu";


const AddEvents = () => {
    return (
        <div className="flex">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            <div className="flex-1 min-h-screen py-8 px-4 md:ml-80">
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Events</h1>
                        <p className="text-gray-600">Create and manage your events with ease</p>
                    </div>

                    {/* Main Form Card */}
                    <AddEventsForm />
                </div>
            </div>
        </div>
    )
}

export default AddEvents;
