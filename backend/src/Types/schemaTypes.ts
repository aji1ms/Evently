import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    avatar?: string;
    isAdmin: boolean;
    isBlocked: boolean;
    role: "user" | "admin";
    authSource: "self" | "google";
    bookings: Types.ObjectId[];
    bookmarks: Types.ObjectId[];
    notifications: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IEvent extends Document {
    title: string;
    description: string;
    category: Schema.Types.ObjectId;
    eventType: "online" | "offline";
    meetingLink?: string;
    location?: {
        venue: string;
        address: string;
        city: string;
        state: string;
    };
    eventDate: Date;
    eventTime: string;
    organizer: string;
    regularPrice: number;
    salePrice: number;
    totalSeats: number;
    availableSeats: number;
    image: string;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

export interface ICategory extends Document {
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface INotification extends Document {
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBooking extends Document {
    user: Types.ObjectId;
    event: Types.ObjectId;
    totalQuantity: number;
    totalAmount: number;
    bookingDate: Date;
    status: "pending" | "completed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    paymentMethod: "paypal";
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookmark extends Document {
    user: mongoose.Types.ObjectId;
    event: mongoose.Types.ObjectId;
    createdAt: Date;
}

export interface IMessage extends Document {
    userId: mongoose.Types.ObjectId;
    username: string;
    message: string;
    timestamp: Date;
}

export interface IRoom extends Document {
    name: string;
    description?: string;
    participants: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}