// components/user/Containers/Events_Page/SimplePagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import { setPage } from '../../../../Redux/slices/auth/authEventsSlice';

const EventPagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pagination } = useSelector((state: RootState) => state.authEvents);

    const { currentPage, totalPages, hasNext, hasPrev } = pagination;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setPage(page));
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-end space-x-2 py-6">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrev}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${hasPrev
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
            </button>

            <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNext}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${hasNext
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
            >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};

export default EventPagination;