import { Document, Types } from "mongoose";

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

export interface IBooking extends Document { }

export interface IEvent extends Document { }

export interface IBookmark extends Document { }

export interface INotification extends Document { }


