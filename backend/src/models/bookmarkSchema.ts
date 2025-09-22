import mongoose, { Schema } from "mongoose";
import { IBookmark } from "../Types/schemaTypes";

const bookmarkSchema = new Schema<IBookmark>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        }
    },
    { timestamps: true }
);

const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);
module.exports = Bookmark; 