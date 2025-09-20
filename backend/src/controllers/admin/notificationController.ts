import { Request, Response } from 'express';
const Notification = require("../../models/notificationSchema");
const User = require("../../models/userSchema");

// Create Notification

const createNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            res.status(400).json({ message: "Title and message are required!" });
            return;
        }

        const users = await User.find({ isBlocked: false, isAdmin: false }).select('_id');

        if (users.length == 0) {
            res.status(400).json({ message: "No active users found!" });
            return;
        }

        const notification = new Notification({
            title: title.trim(),
            message: message.trim(),
        })

        await notification.save();

        const userUpdates = users.map((user: any) => ({
            updateOne: {
                filter: { _id: user._id },
                update: {
                    $push: {
                        notifications: {
                            notification: notification._id,
                            isRead: false
                        }
                    }
                }
            }
        }));

        await User.bulkWrite(userUpdates);

        res.status(201).json({ message: `Notification sent to ${users.length} users successfully!` })
    } catch (error) {
        console.log("Error creating notification: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Edit Notification

const editNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { title, message } = req.body;

        if (!title || !message) {
            res.status(400).json({ message: "Title and message are required!" });
            return;
        }

        const updatedNotification = await Notification.findByIdAndUpdate(id, {
            title,
            message,
        }, { new: true });

        if (!updatedNotification) {
            res.status(404).json({ message: "Notification not found!" });
            return;
        }

        res.status(200).json({ message: "Notification updated successfully!" });
    } catch (error) {
        console.log("Error Editing notification: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete Notification

const deleteNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            res.status(404).json({ message: "Notification not found!" });
            return;
        }

        await User.updateMany(
            { "notifications.notification": id },
            {
                $pull: {
                    notifications: { notification: id }
                }
            }
        );

        res.status(200).json({ message: "Notification deleted successfully!" });
    } catch (error) {
        console.error("Error deleting notification: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Notification

const getNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        const query: any = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const notifications = await Notification.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notification retrieved successfully!",
            data: notifications,
            count: notifications.length
        });
    } catch (error) {
        console.log("Error getting notification: ", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}


module.exports = {
    createNotification,
    editNotification,
    deleteNotification,
    getNotifications,
};