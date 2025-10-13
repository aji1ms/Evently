import { Request, Response } from "express";
const Review = require("../../models/reviewSchema");

// Create Review

const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id

        if (!userId) {
            res.status(401).json({ message: "User not authenticated!" });
            return;
        }

        const { name, comment, rating } = req.body;
        if (!name || !comment || !rating) {
            res.status(400).json({ message: "All fields are required!" });
            return;
        }

        if (rating < 1 || rating > 5) {
            res.status(400).json({ message: "Rating must be between 1 and 5!" });
            return;
        }

        const review = new Review({ name, comment, rating, user: userId });
        await review.save();

        res.status(201).json({
            message: "Review added successfully!",
            data: review,
        });
    } catch (error) {
        console.log("Error creating error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createReview };