import { Request, Response } from "express";
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");
const Booking = require("../../models/bookingSchema");

interface Item {
    _id: number;
    sales: number;
    revenue: number;
}

const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
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

        // BEST SELLING EVENTS
        const bestSellingEvents = await Event.aggregate([
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
                    price: "$salePrice",
                    sold: { $sum: "$bookings.totalQuantity" },
                    revenue: { $sum: "$bookings.totalAmount" },
                }
            },
            { $sort: { sold: -1 } },
            { $limit: 5 }
        ]);

        // SALES OVERVIEW - WEEKLY DATA (Current Week)
        const weeklySales = await Booking.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                        $lte: new Date()
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    sales: { $sum: "$totalQuantity" },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const formattedWeekly = dayNames.map((day, index) => {
            const dayData = weeklySales.find((item: Item) => item._id === index + 1);
            return {
                name: day,
                sales: dayData?.sales || 0,
                revenue: dayData?.revenue || 0
            };
        });

        // SALES OVERVIEW - MONTHLY DATA (Current Year)
        const monthlySales = await Booking.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), 0, 1),
                        $lte: new Date()
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    sales: { $sum: "$totalQuantity" },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Format monthly data
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedMonthly = monthNames.map((month, index) => {
            const monthData = monthlySales.find((item: Item) => item._id === index + 1);
            return {
                name: month,
                sales: monthData?.sales || 0,
                revenue: monthData?.revenue || 0
            };
        });

        // SALES OVERVIEW - YEARLY DATA (Last 5 years)
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 4;

        const yearlySales = await Booking.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startYear, 0, 1),
                        $lte: new Date()
                    }
                }
            },
            {
                $group: {
                    _id: { $year: "$createdAt" },
                    sales: { $sum: "$totalQuantity" },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Format yearly data
        const formattedYearly = Array.from({ length: 5 }, (_, index) => {
            const year = startYear + index;
            const yearData = yearlySales.find((item: Item) => item._id === year);
            return {
                name: year.toString(),
                sales: yearData?.sales || 0,
                revenue: yearData?.revenue || 0
            };
        });


        res.status(200).json({
            message: "Report received succesfully",
            stats: {
                totalUsers,
                totalRevenue,
                totalBookings,
                totalEvents
            },
            bestSellingEvents,
            salesOverview: {
                weekly: formattedWeekly,
                monthly: formattedMonthly,
                yearly: formattedYearly
            }
        })
    } catch (error) {
        console.error("Error generating admin dashboard:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = { getAdminDashboard };