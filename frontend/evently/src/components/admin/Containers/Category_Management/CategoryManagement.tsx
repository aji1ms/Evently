import { Plus, LayoutList } from 'lucide-react';
import StatsCard from '../Dashboard_Page/StatsCard';
import CategoryTable from './CategoryTable';
import CategoryModal, { type CategoryFormData } from '../../../user/Inputs/CategoryModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../Redux/store';
import { createCategory, fetchAllCategories } from '../../../../Redux/slices/admin/adminCategorySlice';
import CategorySearchFilter from './CategorySearchFilter';
import toast from 'react-hot-toast';
import CategoryPagination from './CategoryPagination';

const CategoryManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, error, loading, pagination } = useSelector((state: RootState) => state.adminCategories);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAllCategories({}));
    }, [dispatch]);

    const handleAddCategory = async (categoryData: CategoryFormData) => {
        try {
            await dispatch(createCategory(categoryData)).unwrap();
            toast.success(`Category created successfully!`, { duration: 2000 });
            dispatch(fetchAllCategories({}));
            setIsModalOpen(false);
        } catch (err: any) {
            toast.error(error, { duration: 2000 });
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:ml-80">
            <div className="mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
                            <p className="text-gray-600 mt-1">Manage your product categories</p>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={20} />
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Category"
                        value={pagination?.totalCategories || 0}
                        icon={<LayoutList className="w-6 h-6 text-blue-600" />}
                    />

                    <StatsCard
                        title="Active Category"
                        value={pagination?.activeCategories || 0}
                        icon={<LayoutList className="w-6 h-6 text-green-600" />}
                    />

                    <StatsCard
                        title="Inactive Category"
                        value={pagination?.inactiveCategories || 0}
                        icon={<LayoutList className="w-6 h-6 text-red-500" />}
                    />
                </div>

                {/* Search and Filters */}
                <CategorySearchFilter />

                {/* Categories Table */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading categories...</p>
                    </div>
                ) : (
                    <>
                        <CategoryTable categoryDatas={categories} />
                        <CategoryPagination />
                    </>
                )}
            </div>

            {/* Modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCategory}
            />
        </div>
    );
}

export default CategoryManagement;