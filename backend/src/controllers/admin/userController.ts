import { Request, Response } from "express";
const User = require("../../models/userSchema");

// Users Info

const userInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        let query: any = { isAdmin: false };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        if (!users) {
            res.status(500).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({
            message: "Users retrived successfully!",
            data: users,
            count: users.length
        })
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

        const updateUser = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });
        if (!updateUser) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const status = isBlocked ? "blocked" : "activated";

        res.status(200).json({ message: `User ${status} successfully!` })
    } catch (error) {
        console.log("Error toggling User status: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

// Edit User 

const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.body;

        const editUser = await User.findByIdAndUpdate(id, { isAdmin }, { new: true });
        if (!editUser) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({ message: "User edited successfully!" });
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