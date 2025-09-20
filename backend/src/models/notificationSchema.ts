import mongoose, { Schema } from "mongoose";
import { INotification } from "../Types/schemaTypes";

const notificationSchema = new Schema<INotification>(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)

const Notification = mongoose.model<INotification>("Notification", notificationSchema);
module.exports = Notification;           