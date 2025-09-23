import { Request, Response } from "express";
const Review = require("../../models/reviewSchema");

// Get All Reviews

const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        const totalReviews = reviews.length;

        res.status(200).json({
            message: "Reviews retrieved successfully!",
            data: reviews,
            count: totalReviews,
        });
    } catch (error) {
        console.log("Error Getting reviews: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete Reviews

const delteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            res.status(400).json({ message: "Review not found!" });
            return;
        }

        res.status(201).json({ message: "Review deleted successfully!" });
    } catch (error) {
        console.log("Error deleting reviews: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getReviews,
    delteReview
};