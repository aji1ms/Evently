import mongoose, { Schema } from "mongoose";
import { IMessage } from "../Types/schemaTypes";

const messageSchema = new Schema<IMessage>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Message = mongoose.model<IMessage>("Message", messageSchema)
module.exports = Message;