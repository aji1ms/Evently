import { Request, Response } from "express";
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");
const Booking = require("../../models/bookingSchema");

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getAdminReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookingsResult = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    totalBookings: { $sum: "$totalQuantity" }
                }
            }
        ]);
        const totalBookings = totalBookingsResult[0]?.totalBookings || 0;
        const totalRevenueResult = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;

        // USER GROWTH DATA
        const userGrowthAgg = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    newUsers: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        let cumulative = 0;
        const userGrowth = userGrowthAgg.map((item: any) => {
            cumulative += item.newUsers;
            return {
                month: monthNames[item._id - 1],
                users: cumulative,
                newUsers: item.newUsers
            };
        });

        // EVENT POPULARITY
        const eventPopularity = await Event.aggregate([
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "event",
                    as: "bookings"
                }
            },
            {
                $project: {
                    name: "$title",
                    capacity: "$totalSeats",
                    bookings: { $sum: "$bookings.totalQuantity" }
                }
            },
            { $sort: { bookings: -1 } },
            { $limit: 5 }
        ]);

        // BOOKING TRENDS 
        const bookingTrendsAgg = await Booking.aggregate([
            {
                $group: {
                    _id: { $week: "$createdAt" },
                    bookings: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } },
            { $limit: 8 }
        ]);

        const bookingTrends = bookingTrendsAgg.map((b: any, index: number) => ({
            week: `Week ${index + 1}`,
            bookings: b.bookings
        }));

        // REVENUE BREAKDOWN
        const revenueBreakdown = await Booking.aggregate([
            {
                $group: {
                    _id: "$paymentMethod",
                    value: { $sum: "$totalAmount" }
                }
            }
        ]);

        const colorMap: Record<string, string> = {
            card: "#3B82F6",
            upi: "#10B981",
            paypal: "#F59E0B",
            cash: "#EF4444"
        };

        const formattedRevenueBreakdown = revenueBreakdown.map((r: any) => ({
            name: r._id.charAt(0).toUpperCase() + r._id.slice(1),
            value: r.value,
            color: colorMap[r._id] || "#6366F1"
        }));

        // MOST ATTENDED EVENTS
        const mostAttendedEvents = await Event.aggregate([
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "event",
                    as: "bookings"
                }
            },
            {
                $project: {
                    name: "$title",
                    attendees: { $sum: "$bookings.totalQuantity" },
                    revenue: { $sum: "$bookings.totalAmount" },
                    date: "$eventDate"
                }
            },
            { $sort: { attendees: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            message: "Report received succesfully",
            totals: {
                totalUsers,
                totalRevenue,
                totalBookings,
                totalEvents
            },
            userGrowth,
            eventPopularity,
            bookingTrends,
            revenueBreakdown: formattedRevenueBreakdown,
            mostAttendedEvents
        });
    } catch (error) {
        console.error("Error generating admin report:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};


module.exports = { getAdminReport };