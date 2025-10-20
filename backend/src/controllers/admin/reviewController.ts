import { Request, Response } from "express";
const Review = require("../../models/reviewSchema");

// Get All Reviews

const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { dateFilter, rating, page = 1, limit = 5 } = req.query;

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 5;
        const skip = (pageNum - 1) * limitNum;

        let query: any = {}

        if (dateFilter && dateFilter !== "all") {
            const now = new Date();
            let startDate: Date = new Date();
            let endDate = new Date();

            switch (dateFilter) {
                case "week":
                    startDate.setDate(now.getDate() - 7);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case "month":
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case "year":
                    startDate = new Date(now.getFullYear(), 0, 1);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                default:
                    break;
            }

            if (startDate) {
                query.createdAt = { $gte: startDate, $lte: endDate };
            }
        }

        if (rating) {
            if (Array.isArray(rating)) {
                query.rating = { $in: rating.map(r => parseInt(r as string)) };
            } else {
                const ratingValue = parseInt(rating as string);
                if (!isNaN(ratingValue)) {
                    query.rating = ratingValue;
                }
            }
        }

        const totalReviews = await Review.countDocuments();
        const totalCount = await Review.countDocuments(query);

        const averageRating = await Review.aggregate([
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ])

        const fiveStarCount = await Review.countDocuments({ rating: 5 })

        const reviews = await Review.find(query)
            .populate("user", "name email avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)

        const totalPages = Math.ceil(totalCount / limitNum)

        res.status(200).json({
            message: "Reviews retrieved successfully!",
            data: reviews,
            totalReviews,
            averageRating: averageRating[0]?.averageRating || 0,
            fiveStarCount,
            currentPage: pageNum,
            totalCount,
            totalPages,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1,
        });
    } catch (error) {
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

        res.status(201).json({
            message: "Review deleted successfully!",
            data: review,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getReviews,
    delteReview
};                  