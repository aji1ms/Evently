import { Request, Response } from "express";
const Bookmark = require("../../models/bookmarkSchema");
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");

// Add To Bookmark

const addToBookmark = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login!" });
            return;
        }

        const { eventId } = req.body;
        if (!eventId) {
            res.status(400).json({ message: "Select an event!" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const event = await Event.findById(eventId);
        if (!event) {
            res.status(400).json({ message: "Event not found!" });
            return;
        }

        const existingBookmark = await Bookmark.findOne({
            user: userId,
            event: eventId
        });

        if (existingBookmark) {
            res.status(400).json({ message: "Event already bookmarked!" });
            return;
        }

        const bookmark = new Bookmark({
            user: userId,
            event: eventId
        });

        await bookmark.save();

        await User.findByIdAndUpdate(userId, {
            $push: { bookmarks: bookmark._id }
        });

        res.status(201).json({
            message: "Event added to bookmarks successfully!",
            data: bookmark,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Remove From Bookmark

const removeFromBookmark = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login!" });
            return;
        }

        const { eventId } = req.body;
        if (!eventId) {
            res.status(400).json({ message: "Select an event!" });
            return;
        }

        const deletedBookmark = await Bookmark.findOneAndDelete({ user: userId, event: eventId });
        if (!deletedBookmark) {
            res.status(404).json({ message: "Bookmark not found!" });
            return;
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { bookmarks: deletedBookmark._id }
        });

        res.status(200).json({
            message: "Event removed from bookmarks successfully!",
            data: deletedBookmark,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Bookmarks

const getBookmarks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login!" });
            return;
        }

        const bookmarks = await Bookmark.find({ user: userId })
            .populate({
                path: 'event',
                select: '-meetingLink', 
                populate: {
                    path: 'category',
                    select: 'name' 
                }
            })
            .sort({ createdAt: -1 });
        if (!bookmarks) {
            res.status(400).json({ message: "No bookmarks found!" });
            return;
        }

        res.status(200).json({
            message: "Bookmarks retrieved successfully!",
            data: bookmarks,
            count: bookmarks.length,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addToBookmark,
    removeFromBookmark,
    getBookmarks,
}