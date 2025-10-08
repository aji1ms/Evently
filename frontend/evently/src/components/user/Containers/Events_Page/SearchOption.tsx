import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { fetchAllEvents, setSearch } from '../../../../Redux/slices/auth/authEventsSlice';

const SearchOption = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search, filters, pagination } = useSelector((state: RootState) => state.authEvents)

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
            type: filters.type,
            category: filters.category,
            page: pagination.currentPage
        }));
    }, [debouncedSearch, filters, pagination.currentPage, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setLocalSearch('');
        setDebouncedSearch('');
        dispatch(setSearch(''));
    };

    return (
        <div className="flex items-center justify-end">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search events by name..."
                    value={localSearch}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-colors"
                />
                {localSearch && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchOption;