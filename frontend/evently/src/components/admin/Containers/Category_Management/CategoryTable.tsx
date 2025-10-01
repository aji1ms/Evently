import { Edit2, Shield, Trash2 } from "lucide-react"
import { deleteCategory, editCategoryData, editCategoryStatus, type Category } from "../../../../Redux/slices/admin/adminCategorySlice"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../Redux/store";
import ToastCustomAlert from "../../../user/Inputs/ToastCustomAlert";
import toast from "react-hot-toast";
import { useState } from "react";
import type { CategoryFormData } from "../../../user/Inputs/CategoryModal";
import CategoryModal from "../../../user/Inputs/CategoryModal";

interface CategoryDatas {
    categoryDatas: Category[];
}

const CategoryTable = ({ categoryDatas }: CategoryDatas) => {
    const dispatch = useDispatch<AppDispatch>();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const handleToggleStatus = (id: string, currentStatus: boolean) => {
        const action = currentStatus ? "inactive" : "active";
        ToastCustomAlert(
            `Are you sure to make this category ${action}?`,
            () => {
                dispatch(editCategoryStatus({ categoryId: id, isActive: !currentStatus }))
                    .unwrap()
                    .then(() => toast.success(`Category status updated successfully!`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        );
    }

    const handleDelete = (id: string) => {
        ToastCustomAlert(
            `Are you sure to delete this category?`,
            () => {
                dispatch(deleteCategory(id)).unwrap()
                    .then(() => toast.success(`Category deleted successfully`, { duration: 2000 }))
                    .catch((err) => toast.error(err, { duration: 2000 }));
            }
        )
    }

    const handleEditCategory = (category: Category) => {
        setEditCategory(category);
        setEditModalOpen(true);
    };

    const handleUpdateCategory = (data: CategoryFormData) => {
        if (!editCategory) return;
        dispatch(
            editCategoryData({
                categoryId: editCategory._id,
                name: data.name,
                description: data.description,
            })
        )
            .unwrap()
            .then(() => toast.success("Category updated successfully"))
            .catch((err) => toast.error(err));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categoryDatas.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No categories found. Click "Add Category" to create one.
                                </td>
                            </tr>
                        ) : (
                            categoryDatas.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 max-w-md truncate">
                                            {category.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${category.isActive
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                        >
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className={`p-2 rounded-lg text-sm font-medium ${category.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    } cursor-pointer`}
                                                title="status"
                                                onClick={() => handleToggleStatus(category._id, category.isActive)}
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                                                title="Edit"
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                                title="Delete"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <CategoryModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleUpdateCategory}
                initialData={{
                    name: editCategory?.name || "",
                    description: editCategory?.description || "",
                }}
                isEdit={true}
            />
        </div>
    )
}

export default CategoryTable
