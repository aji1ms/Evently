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

        const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: bookings.length > 0
                ? "Bookings retrieved successfully!"
                : "No bookings found!",
            data: bookings,
            count: bookings.length
        });
    } catch (error) {
        console.error("Error getting user bookings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Booking Details

const bookingDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookingId } = req.params;
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Please login to view order details!" });
            return;
        }

        const bookingDetail = await Booking.findOne(bookingId);
        if (!bookingDetail) {
            res.status(404).json({ message: "Booking not found!" });
            return;
        }

        res.status(200).json({
            message: "Order details retrieved successfully!", booking: bookingDetail
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