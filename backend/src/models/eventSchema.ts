import mongoose, { Schema, Document } from "mongoose";
import { IEvent } from "../Types/schemaTypes";

const locationSchema = new Schema(
    {
        venue: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
    },
    { _id: false }
);

const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        eventType: {
            type: String,
            enum: ["online", "offline"],
            required: true,
            default: "offline",
        },
        meetingLink: {
            type: String,
            required: function () {
                return this.eventType === "online";
            }
        },
        location: {
            type: locationSchema,
            required: function () {
                return this.eventType === "offline";
            },
        },
        eventDate: {
            type: Date,
            required: true
        },
        eventTime: {
            type: String,
            required: true
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        salePrice: {
            type: Number,
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true
        },
        availableSeats: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
        },
        organizer: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Event = mongoose.model<IEvent>("Event", eventSchema);
module.exports = Event; 