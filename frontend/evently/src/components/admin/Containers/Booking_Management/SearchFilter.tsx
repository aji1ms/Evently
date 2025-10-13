import { Search, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchAdminBookings, setDateFilter, setSearch } from '../../../../Redux/slices/admin/adminBookingSlice';

const SearchFilter = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { search, filters, pagination } = useSelector((state: RootState) => state.adminBookings);

    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== search) {
                dispatch(setSearch(localSearch));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch, search, dispatch]);

    useEffect(() => {
        dispatch(fetchAdminBookings({
            search: search,
            dateFilter: filters.dateFilter,
            page: pagination.currentPage
        }));
    }, [search, filters.dateFilter, pagination.currentPage, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setDateFilter({ dateFilter: e.target.value }));
    };

    const handleClearFilters = () => {
        dispatch(setSearch(''));
        dispatch(setDateFilter({ dateFilter: '' }));
        setLocalSearch('');
    };

    const hasActiveFilters = search || filters.dateFilter;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by event name, customer name, or booking ID..."
                            value={localSearch}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="md:w-48">
                    <select
                        value={filters.dateFilter}
                        onChange={handleStatusChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClearFilters}
                        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                        Clear
                    </button>
                )}

                {/* Export Button */}
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>
        </div>
    )
}

export default SearchFilter
