// models/bookingSchema.ts
import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "../Types/schemaTypes";

const bookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true
        },
        bookingDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["pending", "cancelled", "completed"],
            default: "completed"
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        paymentMethod: {
            type: String,
            enum: ["card", "paypal", "stripe"],
            required: true
        },
        transactionId: {
            type: String
        }
    },
    { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
module.exports = Booking;