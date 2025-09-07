const FilterSidebar = () => {

    const eventLocation: string[] = ["Online", "Offline"];
    const eventDate: string[] = ["Today", "Upcoming", "This week", "This month"];
    const categories: string[] = ["Paid", "Unpaid"];

    return (
        <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>

            {/* Event Category Filter*/}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="category"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* Event Type Filter*/}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                {eventLocation.map((location) => (
                    <div key={location} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="location"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700">{location}</span>
                    </div>
                ))}
            </div>

            {/* Event Type Filter*/}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Date</label>
                {eventDate.map((date) => (
                    <div key={date} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="date"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700">{date}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterSidebar
