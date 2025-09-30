import { Request, Response } from "express";
const User = require("../../models/userSchema");

// Users Info

const userInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            search,
            status,
            role,
            page = 1,
            limit = 6,
        } = req.query;

        let query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (status && status !== 'all') {
            query.isBlocked = status === 'blocked';
        }

        if (role && role !== 'all') {
            query.role = role;
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const users = await User.find(query)
            .select('-password').
            sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)

        const totalUsers = await User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limitNum);

        if (!users) {
            res.status(500).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({
            message: "Users retrieved successfully!",
            data: users,
            count: users.length,
            totalUsers,
            totalPages,
            currentPage: pageNum,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1
        });
    } catch (error) {
        console.log("Error getting user info: ", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

// Block & Unblock User

const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isBlocked } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { isBlocked }, { new: true }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const status = isBlocked ? "blocked" : "activated";

        res.status(200).json({
            message: `User ${isBlocked ? 'blocked' : 'activated'} successfully!`,
            data: updatedUser
        });
    } catch (error) {
        console.log("Error toggling User status: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

// Edit User 

const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isAdmin, role } = req.body;

        const editedUser = await User.findByIdAndUpdate(id, { isAdmin, role }, { new: true });
        if (!editUser) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({
            message: "User edited successfully!",
            data: editedUser,
        });
    } catch (error) {
        console.log("Error editing user: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = {
    userInfo,
    toggleUserStatus,
    editUser,
}