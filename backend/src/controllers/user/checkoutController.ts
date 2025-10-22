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
            res.status(400).json({
                message: `Only ${event.availableSeats} seats available!`
            });
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
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Booking Confirmation</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #2c3e50; padding: 30px 40px; text-align: center;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Evently</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 40px;">
                                            <h2 style="margin: 0 0 20px 0; color: #2c3e50; font-size: 20px;">Booking Confirmation</h2>
                                            <p style="margin: 0 0 15px 0; color: #555555; line-height: 1.6;">
                                                Hello <strong>${user.name}</strong>,
                                            </p>
                                            <p style="margin: 0 0 25px 0; color: #555555; line-height: 1.6;">
                                                Your ticket booking has been confirmed successfully. Here are your event details:
                                            </p>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin-bottom: 25px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">${event.title}</h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Date:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${formatDate(event.eventDate)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Time:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${event.eventTime}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Tickets:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${quantity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Order ID:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px; font-family: monospace;">${booking._id}</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                                <tr>
                                                    <td align="center" style="padding: 20px; background-color: #3498db; border-radius: 6px;">
                                                        <a href="${event.meetingLink}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; display: block;">
                                                            Join Virtual Event
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="margin: 0 0 15px 0; color: #555555; line-height: 1.6; font-size: 14px;">
                                                Meeting Link: <a href="${event.meetingLink}" style="color: #3498db; text-decoration: none;">${event.meetingLink}</a>
                                            </p>
                                            <p style="margin: 0; color: #555555; line-height: 1.6;">
                                                We look forward to seeing you at the event.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                                <strong>Evently</strong><br>
                                                Event Management Platform<br>
                                                <a href="https://evently.website" style="color: #3498db; text-decoration: none;">evently.website</a>
                                            </p>
                                            <p style="margin: 0; color: #999999; font-size: 11px;">
                                                You received this email because you made a booking on Evently.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `;
        } else {
            html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Booking Confirmation</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #2c3e50; padding: 30px 40px; text-align: center;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Evently</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 40px;">
                                            <h2 style="margin: 0 0 20px 0; color: #2c3e50; font-size: 20px;">Booking Confirmation</h2>
                                            <p style="margin: 0 0 15px 0; color: #555555; line-height: 1.6;">
                                                Hello <strong>${user.name}</strong>,
                                            </p>
                                            <p style="margin: 0 0 25px 0; color: #555555; line-height: 1.6;">
                                                Your ticket booking has been confirmed successfully. Here are your event details:
                                            </p>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin-bottom: 25px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">${event.title}</h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Date:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${formatDate(event.eventDate)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Time:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${event.eventTime}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Tickets:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px;">${quantity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; color: #666666; font-size: 14px;"><strong>Order ID:</strong></td>
                                                                <td style="padding: 5px 0; color: #333333; font-size: 14px; font-family: monospace;">${booking._id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="padding: 15px 0 5px 0; color: #666666; font-size: 14px;"><strong>Venue:</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="padding: 5px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                                                                    ${event?.location?.venue || 'N/A'}<br>
                                                                    ${event?.location?.address || 'N/A'}<br>
                                                                    ${event?.location?.city || 'N/A'}, ${event?.location?.state || 'N/A'}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="margin: 0; color: #555555; line-height: 1.6;">
                                                We look forward to seeing you at the event.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                                <strong>Evently</strong><br>
                                                Event Management Platform<br>
                                                <a href="https://evently.website" style="color: #3498db; text-decoration: none;">evently.website</a>
                                            </p>
                                            <p style="margin: 0; color: #999999; font-size: 11px;">
                                                You received this email because you made a booking on Evently.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `;
        }

        try {
            await Promise.race([
                sendMail({
                    to: user.email,
                    subject,
                    html,
                    text: `Hello ${user.name}, Your booking for ${event.title} has been confirmed. Date: ${formatDate(event.eventDate)}, Time: ${event.eventTime}. Order ID: ${booking._id}`
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Email timeout')), 30000)
                )
            ]);
        } catch (emailError) { }

        res.status(201).json({
            message: "Booking confirmed successfully!",
            data: booking
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    checkout,
};