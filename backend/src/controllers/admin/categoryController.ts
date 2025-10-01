import { Request, Response } from "express";
const Category = require("../../models/categorySchema");

// Add Category

const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required!" });
            return;
        }

        const cleanName = name.trim();

        const existingCategory = await Category.findOne({
            name: { $regex: `^${cleanName}$`, $options: 'i' }
        });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists!" });
            return;
        }

        const newCategory = new Category({ name: cleanName, description });
        await newCategory.save();

        res.status(201).json({
            message: "Category created successfully!",
            data: newCategory,
        });
    } catch (error) {
        console.log("Error adding category: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Edit Category

const editCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required!" });
            return;
        }

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }

        const duplicateCategory = await Category.findOne({
            name: { $regex: `^${name.trim()}$`, $options: 'i' },
            _id: { $ne: id }
        });

        if (duplicateCategory) {
            res.status(401).json({ message: "Category name already exists!" });
            return;
        }

        const updateCategory = await Category.findByIdAndUpdate(id, {
            name,
            description,
        }, { new: true });

        res.status(200).json({
            message: "Category updated successfully!",
            data: updateCategory,
        });
    } catch (error) {
        console.log("Error edit category", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete Category

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        await category.deleteOne();

        res.status(200).json({ message: "Category deleted successfully!", });
    } catch (error) {
        console.log("Error deleting category", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Category Status

const toggleCategoryStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const updateCategory = await Category.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!updateCategory) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }

        const status = isActive ? "activated" : "blocked";

        res.status(200).json({
            message: `Category ${status} successfully!`,
            data: updateCategory,
        })
    } catch (error) {
        console.log("Error toggling status category: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

// Get Category Info

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            search,
            status,
            page = 1,
            limit = 5,
        } = req.query;

        let query: any = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (status && status !== 'all') {
            query.isActive = status == 'active'
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const categories = await Category.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)

        const activeCategories = await Category.countDocuments({ ...query, isActive: true });
        const inactiveCategories = await Category.countDocuments({ ...query, isActive: false });

        const totalCategories = await Category.countDocuments(query);
        const totalPages = Math.ceil(totalCategories / limitNum);

        if (!categories) {
            res.status(500).json({ message: "Category not found!" });
            return
        }

        res.status(200).json({
            message: "Categories retrieved successfully!",
            data: categories,
            totalCategories,
            totalPages,
            currentPage: pageNum,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1,
            activeCategories,
            inactiveCategories
        });
    } catch (error) {
        console.log("Error getting category", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    addCategory,
    editCategory,
    toggleCategoryStatus,
    deleteCategory,
    getAllCategories
}