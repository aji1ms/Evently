import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../Redux/store";
import { useEffect } from "react";
import { fetchAllCategories } from "../../../../Redux/slices/admin/adminCategorySlice";

interface FilterSidebarProps {
    onClose?: () => void;
    onFilterChange: (filters: { category?: string; type?: string }) => void;
}

const FilterSidebar = ({ onClose, onFilterChange }: FilterSidebarProps) => {
    const eventLocation: string[] = ["online", "offline"];

    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.adminCategories);
    const { filters } = useSelector((state: RootState) => state.authEvents);

    useEffect(() => {
        dispatch(fetchAllCategories({}))
    }, [dispatch])

    const hasActiveFilters = filters.category !== "" || filters.type !== "";

    const handleCategoryChange = (categoryName: string) => {
        const newCategory = filters.category === categoryName ? "" : categoryName;
        onFilterChange({ category: newCategory });
    };

    const handleTypeChange = (type: string) => {
        const newType = filters.type === type ? "" : type;
        onFilterChange({ type: newType });
    };

    const clearFilters = () => {
        onFilterChange({ category: "", type: "" });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filter</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaTimes className="text-gray-600" size={20} />
                    </button>
                </div>
            </div>


            {/* Event Category Filter*/}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                {categories.map((category) => (
                    < div key={category?._id} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === category?.name}
                            onChange={() => handleCategoryChange(category?.name || "")}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{category?.name}</span>
                    </div>
                ))}
            </div>

            {/* Event Type Filter*/}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
                {eventLocation.map((location) => (
                    <div key={location} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="location"
                            checked={filters.type === location}
                            onChange={() => handleTypeChange(location)}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{location}</span>
                    </div>
                ))}
            </div>
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="text-sm text-black hover:bg-gray-100 cursor-pointer py-2 w-full rounded border border-black"
                >
                    CLEAR
                </button>
            )}
        </div >
    )
}

export default FilterSidebar
