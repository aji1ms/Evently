import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../Types/schemaTypes";
const bcrypt = require("bcrypt");

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: function () { return this.authSource === "self" },
            default: ""
        },
        phone: {
            type: String,
            required: false,
            default: ""
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        authSource: {
            type: String,
            enum: ["self", "google"],
            required: true,
            default: "self"
        },
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        bookmarks: [{
            type: Schema.Types.ObjectId,
            ref: "Bookmark"
        }],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
module.exports = User; 