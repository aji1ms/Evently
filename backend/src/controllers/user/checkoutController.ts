import { Request, Response } from "express";
import { sendMail } from "../../Utils/sendMail";
const User = require("../../models/userSchema");
const Event = require("../../models/eventSchema");
const Booking = require("../../models/bookingSchema");

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

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

        let subject = "🎟️ Your Ticket Booking is Confirmed!";
        let html = "";

        if (event.eventType === "online") {
            html = `
                <h2>Hi ${user.name},</h2>
                <p>Your booking for <b>${event.title}</b> is confirmed!</p>
                <p><b>Date:</b> ${formatDate(event.eventDate)}</p>
                <p><b>Time:</b> ${event.eventTime}</p>
                <p><b>Meeting Link:</b> <a href="${event.meetingLink}">${event.meetingLink}</a></p>
                <p>We can’t wait to see you online 🎥</p>
                <br/>
                <p>– Team Evently</p>
            `;
        } else {
            html = `
                <h2>Hi ${user.name},</h2>
                <p>Your booking for <b>${event.title}</b> is confirmed!</p>
                <p><b>Date:</b> ${formatDate(event.eventDate)}</p>
                <p><b>Time:</b> ${event.eventTime}</p>
                <p><b>Venue:</b> 
                ${event?.location?.address},
                 ${event?.location?.venue}, 
                 ${event?.location?.city},
                 ${event?.location?.state}
                  </p>
                <p>We look forward to seeing you there 🎉</p>
                <br/>
                <p>– Team Evently</p>
            `;
        }

        await sendMail({
            to: user.email,
            subject,
            html,
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