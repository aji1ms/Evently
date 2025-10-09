import { Request, Response } from "express";
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");
const Booking = require("../../models/bookingSchema");

interface IPaymentResult {
    success: boolean;
    transactionId: string | null;
    error: string | null;
}

// Checkout

const checkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const {
            eventId,
            quantity,
            transactionId,
        } = req.body;

        if (!eventId || !quantity || !transactionId) {
            res.status(400).json({
                message: "Event ID, quantity, and transactionId are required!"
            });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: "Please login to book tickets!" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }

        if (quantity <= 0) {
            res.status(400).json({ message: "Quantity must be greater than 0!" });
            return;
        }

        const totalAmount = quantity * event.salePrice;

        if (event.availableSeats < quantity) {
            res.status(400).json({ message: `Only ${event.availableSeats} seats available!` });
            return;
        }

        const booking = new Booking({
            user: userId,
            event: eventId,
            totalQuantity: quantity,
            totalAmount: totalAmount,
            status: "completed",
            paymentStatus: "paid",
            paymentMethod: "paypal",
            transactionId: transactionId,
        });

        await booking.save();

        await Event.findByIdAndUpdate(eventId, {
            $inc: { availableSeats: -quantity }
        });

        await User.findByIdAndUpdate(userId, {
            $push: { bookings: booking._id }
        });

        res.status(201).json({
            message: "Booking confirmed successfully!",
            data: booking
        });
    } catch (error) {
        console.error("Error during PayPal checkout: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    checkout,
}