import { Request, Response } from "express";
const Events = require("../../models/eventSchema");
const Category = require("../../models/categorySchema");

// Load Events

const loadEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await Events.find({ status: "upcoming" })
            .select('-meetingLink')
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(3)

        if (!events || events.length === 0) {
            res.status(404).json({ message: "Events not found!" });
            return;
        }

        res.status(200).json({
            message: "Events retrieved successfully!",
            data: events,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// All Events

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            search,
            category,
            type,
            page = 1,
            limit = 4,
        } = req.query;

        let query: any = {
            status: "upcoming",
        }

        if (search) {
            query.title = { $regex: search, $options: "i" }
        }

        if (type && type !== "") {
            query.eventType = type;
        }

        if (category && category !== "") {
            const categoryDoc = await Category.findOne({
                name: { $regex: new RegExp(`^${category}$`, 'i') }
            });

            if (categoryDoc) {
                query.category = categoryDoc._id;
            } else {
                query.category = null;
            }
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const events = await Events.find(query)
            .select('-meetingLink')
            .populate('category')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)

        const totalEvents = await Events.countDocuments(query);
        const totalPages = Math.ceil(totalEvents / limitNum);

        if (!events || events.length === 0) {
            res.status(404).json({ message: "Events not found!" });
            return;
        }

        res.status(200).json({
            message: "Events retrieved successfully!",
            data: events,
            totalEvents,
            totalPages,
            currentPage: pageNum,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Event Details

const eventDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Event id is missing!" });
            return;
        }

        const event = await Events.findById(id)
            .select('-meetingLink')
            .populate('category');
        if (!event) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }

        res.status(200).json({
            message: "Events retrieved successfully!",
            data: event,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    loadEvents,
    getAllEvents,
    eventDetails,
}