import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { fetchAllNotifications, setPage, setSearch } from '../../../../Redux/slices/admin/adminNotificationSlice';
import { useState, useEffect } from 'react';

const NotifactionSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search, pagination } = useSelector((state: RootState) => state.adminNotifications);

    const [localSearch, setLocalSearch] = useState(search);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(localSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch]);

    useEffect(() => {
        dispatch(fetchAllNotifications({
            search: debouncedSearch,
            page: pagination.currentPage
        }));
    }, [debouncedSearch, pagination.currentPage, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };


    const handleClearSearch = () => {
        dispatch(setSearch(''));
        dispatch(setPage(1));
        setLocalSearch('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search category by name..."
                        value={localSearch}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {(localSearch) && (
                    <button
                        onClick={handleClearSearch}
                        className="px-3 py-2 mx-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default NotifactionSearch;
