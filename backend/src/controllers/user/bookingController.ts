import { Request, Response } from "express";
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");
const Booking = require("../../models/bookingSchema");

// Booking List

const getBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login to view orders!" });
            return;
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 6;
        const skip = (page - 1) * limit;

        const totalTickets = await Booking.countDocuments({ user: userId });

        const bookings = await Booking.find({ user: userId })
            .populate("event")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalPages = Math.ceil(totalTickets / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            message: bookings.length > 0
                ? "Bookings retrieved successfully!"
                : "No bookings found!",
            data: bookings,
            currentPage: page,
            totalPages,
            totalTickets,
            hasNextPage,
            hasPrevPage
        });
    } catch (error) {
        console.error("Error getting user bookings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Booking Details

const bookingDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login to view order details!" });
            return;
        }

        if (!id) {
            res.status(401).json({ message: "Booking ID required!" });
            return;
        }

        const bookingDetail = await Booking.findById(id)
            .populate({
                path: 'event',
                populate: {
                    path: 'category',
                }
            })

        if (!bookingDetail) {
            res.status(404).json({ message: "Booking not found!" });
            return;
        }

        res.status(200).json({
            message: "Order details retrieved successfully!",
            data: bookingDetail
        });
    } catch (error) {
        console.error("Error geting user bookings details: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getBookings,
    bookingDetails
}