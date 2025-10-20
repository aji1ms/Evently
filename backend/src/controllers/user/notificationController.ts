import { Request, Response } from "express";
const Notification = require("../../models/notificationSchema");
const User = require("../../models/userSchema");

// Get Notifications

const getNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login!" });
            return;
        }

        const user = await User.findById(userId)
            .populate({
                path: 'notifications.notification',
                select: 'title message createdAt'
            })
            .select('notifications');

        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const notifications = user.notifications.filter((notif: any) => !notif.isRead)
            .map((n: any) => ({
                _id: n.notification._id,
                title: n.notification.title,
                message: n.notification.message,
                createdAt: n.notification.createdAt,
                isRead: n.isRead
            }));

        res.status(200).json({
            message: "Notifications fetched successfully",
            data: notifications,
            count: notifications.length
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Mark All Read As

const markAllAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            res.status(401).json({ message: "Please login!" });
            return;
        }

        await User.updateMany(
            { _id: userId },
            {
                $set: {
                    'notifications.$[].isRead': true,
                }
            }
        );

        res.status(200).json({
            message: "All notifications marked as read successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getNotifications,
    markAllAsRead,
}