import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { setPage } from '../../../../Redux/slices/admin/adminCategorySlice';

const CategoryPagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pagination } = useSelector((state: RootState) => state.adminCategories);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    if (pagination.totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-end bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className={`p-2 rounded-lg border ${pagination.hasPrev
                        ? 'text-gray-600 hover:bg-gray-50 border-gray-300'
                        : 'text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${page === pagination.currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className={`p-2 rounded-lg border ${pagination.hasNext
                        ? 'text-gray-600 hover:bg-gray-50 border-gray-300'
                        : 'text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CategoryPagination;