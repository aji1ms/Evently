import { Response, Request } from "express";
import mongoose from "mongoose";
const Booking = require("../../models/bookingSchema");
const Event = require("../../models/eventSchema");
const User = require("../../models/userSchema");

// Booking List

const listBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, dateFilter, page = 1, limit = 5 } = req.query;

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 5;
        const skip = (pageNum - 1) * limitNum;

        let query: any = {};

        if (search) {
            if (mongoose.Types.ObjectId.isValid(search as string)) {
                query._id = new mongoose.Types.ObjectId(search as string);
            } else {
                const searchRegex = new RegExp(search as string, 'i');

                const matchingEvents = await Event.find({
                    title: searchRegex
                }).select("_id");

                const matchingUsers = await User.find({
                    $or: [
                        { name: searchRegex },
                        { email: searchRegex }
                    ]
                }).select("_id");

                const eventIds = matchingEvents.map((e: any) => e._id);
                const userIds = matchingUsers.map((u: any) => u._id);

                query.$or = [];

                if (eventIds.length > 0) {
                    query.$or.push({ event: { $in: eventIds } });
                }

                if (userIds.length > 0) {
                    query.$or.push({ user: { $in: userIds } });
                }

                if (query.$or.length === 0) {
                    query.$or.push({ _id: null });
                };
            }
        }

        if (dateFilter) {
            const now = new Date();
            let startDate: Date | undefined;
            let endDate = new Date();

            switch (dateFilter) {
                case "today":
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    endDate = new Date(now.setHours(23, 59, 59, 999));
                    break;
                case "week":
                    startDate = new Date();
                    startDate.setDate(now.getDate() - 7);
                    break;
                case "month":
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case "year":
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
            }

            if (startDate) {
                query.bookingDate = { $gte: startDate, $lte: endDate };
            }
        }

        const totalBookings = await Booking.countDocuments();
        const totalTicketsSold = await Booking.aggregate([
            { $group: { _id: null, totalTicketsSold: { $sum: "$totalQuantity" } } }
        ]);
        const totalRevenue = await Booking.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);

        const totalCount = await Booking.countDocuments(query);

        const bookings = await Booking.find(query)
            .populate("user", "name email")
            .populate({
                path: "event",
                populate: { path: "category" },
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        const totalPages = Math.ceil(totalCount / limitNum);

        res.status(200).json({
            message: "Bookings retrieved successfully!",
            data: bookings,
            totalBookings,
            totalTicketsSold: totalTicketsSold[0]?.totalTicketsSold || 0,
            totalRevenue: totalRevenue[0]?.totalRevenue || 0,
            currentPage: pageNum,
            totalPages,
            totalCount,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1,
        });
    } catch (error) {
        console.error("Error listing bookings:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

// View Order Details

const viewOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate("user", "name email phone")
            .populate({
                path: "event",
                populate: { path: "category" },
            })

        if (!booking) {
            res.status(401).json({ message: "Booking not found!" });
            return;
        }

        res.status(200).json({
            message: "Booking details retrieved!",
            data: booking,
        });
    } catch (error) {
        console.log("Error viewing booking details: ", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = {
    listBookings,
    viewOrderDetails,
}