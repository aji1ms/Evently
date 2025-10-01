import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { setSearch, setFilters, fetchAllCategories, setPage } from '../../../../Redux/slices/admin/adminCategorySlice';
import { useState, useEffect } from 'react';

const CategorySearchFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search, filters, pagination } = useSelector((state: RootState) => state.adminCategories);

    const [localSearch, setLocalSearch] = useState(search);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(localSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch]);

    useEffect(() => {
        dispatch(fetchAllCategories({
            search: debouncedSearch,
            status: filters.status,
            page: pagination.currentPage
        }));
    }, [debouncedSearch, filters, pagination.currentPage, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilters({ status: e.target.value }));
        dispatch(setPage(1));
    };

    const handleClearFilters = () => {
        dispatch(setSearch(''));
        dispatch(setFilters({ status: 'all' }));
        dispatch(setPage(1));
        setLocalSearch('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search category by name..."
                        value={localSearch}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4">
                    <select
                        value={filters.status}
                        onChange={handleStatusChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {(localSearch || filters.status !== 'all') && (
                        <button
                            onClick={handleClearFilters}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategorySearchFilter;