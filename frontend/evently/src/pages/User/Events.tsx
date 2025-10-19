import { FaFilter } from "react-icons/fa";
import Footer from "../../components/user/Containers/Footer";
import Header from "../../components/user/Containers/Header";
import FilterSidebar from "../../components/user/Containers/Events_Page/FilterSidebar";
import { useEffect, useRef, useState } from "react";
import AllEvents from "./AllEvents";
import SearchOption from "../../components/user/Containers/Events_Page/SearchOption";
import { useDispatch } from "react-redux";
import type { AppDispatch, } from "../../Redux/store";
import { setFilters } from "../../Redux/slices/auth/authEventsSlice";
import EventPagination from "../../components/user/Containers/Events_Page/EventPagination";

const Events = () => {
    const dispatch = useDispatch<AppDispatch>();

    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleFilterChange = (newFilters: { category?: string; type?: string }) => {
        dispatch(setFilters(newFilters));
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

            {/* <Mobile Filter Button /> */}
            <div className="flex flex-col lg:flex-row">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 flex justify-center items-center cursor-pointer"
                >
                    <FaFilter className="mr-2" /> Filters
                </button>

                {/* Filter Sidebar */}
                <div ref={sidebarRef}
                    className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
                >
                    <FilterSidebar onClose={closeSidebar} onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-1 p-4">
                    <SearchOption />
                    <AllEvents />
                    <EventPagination />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Events;