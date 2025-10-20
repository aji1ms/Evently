import mongoose, { Schema } from "mongoose";
import { IRoom } from "../Types/schemaTypes";

const roomSchema = new Schema<IRoom>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model<IRoom>("Message", roomSchema)
module.exports = Room;