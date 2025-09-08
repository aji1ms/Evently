import { FaFilter } from "react-icons/fa";
import Footer from "../../components/user/Containers/Footer";
import Header from "../../components/user/Containers/Header";
import FilterSidebar from "../../components/user/Containers/Events_Page/FilterSidebar";
import { useEffect, useRef, useState } from "react";
import EventsContainer from "../../components/user/Containers/Home_Page/EventsContainer";
import SortOption from "../../components/user/Containers/Events_Page/SortOption";

const Events = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                    className="lg:hidden p-2 flex justify-center items-center"
                >
                    <FaFilter className="mr-2" /> Filters
                </button>

                {/* Filter Sidebar */}
                <div ref={sidebarRef}
                    className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
                >
                    <FilterSidebar />
                </div>
                <div className="flex-1 p-4">
                    <SortOption />
                    <EventsContainer />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Events;