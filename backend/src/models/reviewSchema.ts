import mongoose, { Schema } from "mongoose";
import { IReview } from "../Types/schemaTypes";

const reviewSchema = new Schema<IReview>(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
)

const Review = mongoose.model<IReview>("Review", reviewSchema);
module.exports = Review;