import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { useEffect, useState } from 'react';
import { fetchAllEvents, setPage, setSearch } from '../../../../Redux/slices/admin/adminEventSlice';
import { setFilters } from '../../../../Redux/slices/admin/adminEventSlice';
import { fetchAllCategories } from '../../../../Redux/slices/admin/adminCategorySlice';

const EventSearchFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search, filters, pagination } = useSelector((state: RootState) => state.adminEvents);
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.adminCategories);

    useEffect(() => {
        dispatch(fetchAllCategories({}))
    }, [dispatch]);

    const [localSearch, setLocalSearch] = useState(search);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(localSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch]);

    useEffect(() => {
        dispatch(fetchAllEvents({
            search: debouncedSearch,
            status: filters.status,
            category: filters.category,
            page: pagination.currentPage,
        }));
    }, [debouncedSearch, filters, pagination.currentPage, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilters({ status: e.target.value }));
        dispatch(setPage(1))
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilters({ category: e.target.value }));
        dispatch(setPage(1));
    }

    const handleClearFilters = () => {
        dispatch(setSearch(''));
        dispatch(setFilters({ status: 'all', category: 'all' }));
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
                        placeholder="Search event by name..."
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
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500"
                        value={filters.category}
                        onChange={handleCategoryChange}
                    >
                        <option value="all">
                            {categoriesLoading ? 'Loading categories...' : 'Select category'}
                        </option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {(localSearch || filters.status !== 'all' || filters.category !== 'all') && (
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

export default EventSearchFilter;