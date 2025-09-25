import { Response, Request } from "express";
const Booking = require("../../models/bookingSchema");

// Booking List

const listBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query as { search?: string };

        let query: any = {};

        let bookingsQuery = Booking.find(query)
            .populate("user", "name email")
            .populate("event", "title")
            .sort({ createdAt: -1 });

        if (search) {
            const allBookings = await bookingsQuery.exec();
            const filtered = allBookings.filter((b: any) =>
                (b.event as any)?.title?.toLowerCase().includes(search.toLowerCase())
            );
            res.status(200).json({
                message: "Bookings retrieved successfully!",
                data: filtered,
                count: filtered.length
            });
            return;
        }

        const bookings = await bookingsQuery.exec();
        res.status(200).json({
            message: "Bookings retrieved successfully!",
            data: bookings,
            count: bookings.length
        });
    } catch (error) {
        console.log("Error listing booking: ", error);
        res.status(500).json({ message: "Internal server error!" })
    }
}

// View Order Details

const viewOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate("user", "name email")     
            .populate("event", "title eventDate eventTime price");
            
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