import { Document, Schema, Types } from "mongoose";

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

export interface IBooking extends Document { }

export interface IBookmark extends Document { }

export interface INotification extends Document { }


