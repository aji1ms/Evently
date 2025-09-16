import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../Types/schemaTypes";

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
module.exports = Category; 