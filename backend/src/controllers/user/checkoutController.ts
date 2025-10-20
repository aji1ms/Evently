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

const checkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { eventId, quantity, transactionId } = req.body;

        console.log('=== Checkout Started ===');
        console.log('User ID:', userId);
        console.log('Event ID:', eventId);
        console.log('Quantity:', quantity);
        console.log('Transaction ID:', transactionId);

        // Validation
        if (!eventId || !quantity || !transactionId) {
            console.log('❌ Missing required fields');
            res.status(400).json({
                message: "Event ID, quantity, and transactionId are required!"
            });
            return;
        }

        if (!userId) {
            console.log('❌ User not authenticated');
            res.status(401).json({ message: "Please login to book tickets!" });
            return;
        }

        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            console.log('❌ User not found');
            res.status(404).json({ message: "User not found!" });
            return;
        }
        console.log('✅ User found:', user.email);

        // Fetch event
        const event = await Event.findById(eventId);
        if (!event) {
            console.log('❌ Event not found');
            res.status(404).json({ message: "Event not found!" });
            return;
        }
        console.log('✅ Event found:', event.title);

        if (quantity <= 0) {
            console.log('❌ Invalid quantity');
            res.status(400).json({ message: "Quantity must be greater than 0!" });
            return;
        }

        const totalAmount = quantity * event.salePrice;

        if (event.availableSeats < quantity) {
            console.log('❌ Not enough seats');
            res.status(400).json({
                message: `Only ${event.availableSeats} seats available!`
            });
            return;
        }

        // Create booking
        console.log('📝 Creating booking...');
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
        console.log('✅ Booking created:', booking._id);

        // Update event seats
        console.log('🪑 Updating event seats...');
        await Event.findByIdAndUpdate(eventId, {
            $inc: { availableSeats: -quantity }
        });
        console.log('✅ Seats updated');

        // Update user bookings
        console.log('👤 Updating user bookings...');
        await User.findByIdAndUpdate(userId, {
            $push: { bookings: booking._id }
        });
        console.log('✅ User updated');

        // CRITICAL: Send response BEFORE attempting email
        // This ensures the frontend gets a success response even if email fails
        res.status(201).json({
            message: "Booking confirmed successfully!",
            data: booking
        });

        console.log('✅ Response sent to frontend');

        // Send email AFTER response (asynchronously)
        // This won't block the response or cause 500 errors
        (async () => {
            try {
                let subject = "🎟️ Your Ticket Booking is Confirmed!";
                let html = "";

                if (event.eventType === "online") {
                    html = `
                        <h2>Hi ${user.name},</h2>
                        <p>Your booking for <b>${event.title}</b> is confirmed!</p>
                        <p><b>Date:</b> ${formatDate(event.eventDate)}</p>
                        <p><b>Time:</b> ${event.eventTime}</p>
                        <p><b>Meeting Link:</b> <a href="${event.meetingLink}">${event.meetingLink}</a></p>
                        <p>We can't wait to see you online 🎥</p>
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
                        ${event?.location?.address || 'N/A'},
                         ${event?.location?.venue || 'N/A'}, 
                         ${event?.location?.city || 'N/A'},
                         ${event?.location?.state || 'N/A'}
                          </p>
                        <p>We look forward to seeing you there 🎉</p>
                        <br/>
                        <p>– Team Evently</p>
                    `;
                }

                console.log('📧 Attempting to send email to:', user.email);
                await sendMail({
                    to: user.email,
                    subject,
                    html,
                });
                console.log('✅ Email sent successfully to:', user.email);
            } catch (error) {
                console.error('❌ Email sending failed:', error);
                // Log but don't crash - booking is already complete
                console.error('Email error details:', {
                    err: error,
                    to: user.email,
                    bookingId: booking._id
                });
            }
        })();

        console.log('=== Checkout Completed Successfully ===');

    } catch (error: any) {
        console.error('❌ Checkout error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    checkout,
};