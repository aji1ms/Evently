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
            paymentMethod,
        } = req.body;

        if (!eventId || !quantity || !paymentMethod) {
            res.status(400).json({
                message: "Event ID, quantity, and payment method are required!"
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
            paymentMethod: paymentMethod,
            status: "pending",
            paymentStatus: "pending"
        });
        // await booking.save();

        const paymentResult: IPaymentResult = await processPayment(booking, paymentMethod);

        if (paymentResult.success) {
            booking.paymentStatus = "paid";
            booking.status = "completed";
            booking.transactionId = paymentResult.transactionId;
            
            await booking.save();

            await Event.findByIdAndUpdate(eventId, {
                $inc: { availableSeats: -quantity }
            });

            await User.findByIdAndUpdate(userId, {
                $push: { bookings: booking._id }
            });

            res.status(201).json({ message: "Booking confirmed successfully!" });
        } else {
            res.status(400).json({ message: "Payment failed!" });
        }
    } catch (error) {
        console.error("Error during checkout: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Sample Payment Integration

const processPayment = async (booking: any, paymentMethod: string): Promise<IPaymentResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const success = Math.random() > 0.1;
            resolve({
                success: success,
                transactionId: success ? `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
                error: success ? null : "Payment processing failed"
            });
        }, 1000);
    });
};

module.exports = {
    checkout,
}