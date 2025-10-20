import { Request, Response } from "express";
const Category = require("../../models/categorySchema");
const Event = require("../../models/eventSchema");

// Add Event

const addEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            category,
            eventType,
            meetingLink,
            location,
            eventDate,
            eventTime,
            organizer,
            status,
        } = req.body;

        const regularPrice = Number(req.body.regularPrice);
        const salePrice = Number(req.body.salePrice);
        const totalSeats = Number(req.body.totalSeats);
        const availableSeats = Number(req.body.availableSeats);

        if (!title || !description || !category || !eventType || !eventDate ||
            !eventTime || !regularPrice || !salePrice || !totalSeats ||
            !availableSeats || !organizer) {
            res.status(400).json({ message: "All required fields must be provided!" });
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: "Event image is required!" });
            return;
        }

        if (eventType == "online" && !meetingLink) {
            res.status(400).json({ message: "Meeting link is required for online events!" })
            return;
        }

        if (eventType === "offline" && (!location || !location.venue || !location.address ||
            !location.city || !location.state)) {
            res.status(400).json({ message: "Complete location details are required for offline events!" });
            return;
        }

        const categoryExists = await Category.findOne({
            name: { $regex: new RegExp(`^${category.trim()}$`, 'i') },
            isActive: true
        });

        if (!categoryExists) {
            res.status(400).json({ message: `Category not found or is inactive!` });
            return;
        }

        if (salePrice > regularPrice) {
            res.status(400).json({ message: "Sale price cannot be greater than regular price!" });
            return;
        }

        if (availableSeats > totalSeats) {
            res.status(400).json({ message: "Available seats cannot exceed total seats!" });
            return;
        }

        const currentDate = new Date();
        const inputDate = new Date(eventDate);
        if (inputDate <= currentDate) {
            res.status(400).json({ message: "Event date must be in future!" });
            return;
        }

        const newEvent = new Event({
            title: title.trim(),
            description: description.trim(),
            category: categoryExists._id,
            eventType,
            meetingLink: eventType === "online" ? meetingLink.trim() : undefined,
            location: eventType === "offline" ? {
                venue: location.venue.trim(),
                address: location.address.trim(),
                city: location.city.trim(),
                state: location.state.trim()
            } : undefined,
            eventDate: inputDate,
            eventTime: eventTime.trim(),
            regularPrice,
            salePrice,
            totalSeats,
            availableSeats,
            organizer: organizer.trim(),
            image: req.file.path,
            imagePublicId: req.file.filename,
            status,
        });

        await newEvent.save();

        res.status(201).json({
            message: "Event created successfully!",
            event: newEvent,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Edit Event

const editEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {
            title,
            description,
            category,
            eventType,
            meetingLink,
            location,
            eventDate,
            eventTime,
            regularPrice,
            salePrice,
            totalSeats,
            availableSeats,
            organizer,
            status,
        } = req.body;

        const regularPriceNum = Number(regularPrice);
        const salePriceNum = Number(salePrice);
        const totalSeatsNum = Number(totalSeats);
        const availableSeatsNum = Number(availableSeats);

        if (!title || !description || !category || !eventType || !eventDate ||
            !eventTime || !regularPrice || !salePrice || !totalSeats ||
            !availableSeats || !organizer || !status) {
            res.status(400).json({ message: "All required fields must be provided!" });
            return;
        }

        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }

        const categoryExists = await Category.findOne({
            name: { $regex: new RegExp(`^${category.trim()}$`, 'i') },
            isActive: true
        });

        if (!categoryExists) {
            res.status(400).json({ message: `Category not found or is inactive!` });
            return;
        }

        if (eventType == "online" && !meetingLink) {
            res.status(400).json({ message: "Meeting link is required for online events!" })
            return;
        }

        if (eventType === "offline" && (!location || !location.venue || !location.address ||
            !location.city || !location.state)) {
            res.status(400).json({ message: "Complete location details are required for offline events!" });
            return;
        }

        if (salePriceNum > regularPriceNum) {
            res.status(400).json({ message: "Sale price cannot be greater than regular price!" });
            return;
        }

        if (availableSeatsNum > totalSeatsNum) {
            res.status(400).json({ message: "Available seats cannot exceed total seats!" });
            return;
        }

        let imageUrl = existingEvent.image;
        if (req.file) {
            imageUrl = req.file.path;
        } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.trim() !== '') {
            imageUrl = req.body.image.trim();
        }

        const currentDate = new Date();
        const inputDate = new Date(eventDate);
        if (inputDate <= currentDate) {
            res.status(400).json({ message: "Event date must be in future!" });
            return;
        }

        const updateData: any = {
            title: title.trim(),
            description: description.trim(),
            category: categoryExists._id,
            eventType,
            eventDate: new Date(eventDate),
            eventTime: eventTime.trim(),
            regularPrice: regularPriceNum,
            salePrice: salePriceNum,
            totalSeats: totalSeatsNum,
            availableSeats: availableSeatsNum,
            image: imageUrl,
            organizer: organizer.trim(),
            status,
        };

        if (eventType === "online") {
            updateData.meetingLink = meetingLink.trim();
            updateData.location = undefined;
        } else {
            updateData.location = {
                venue: location.venue.trim(),
                address: location.address.trim(),
                city: location.city.trim(),
                state: location.state.trim()
            };
            updateData.meetingLink = undefined;
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('category');


        if (!updatedEvent) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }

        res.status(200).json({
            message: "Event updated successfully!",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete Event  

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const event = await Event.findById(id);
        if (!event) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }

        await event.deleteOne();

        res.status(200).json({ message: "Event deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Events

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            search,
            status,
            category,
            page = 1,
            limit = 5,
        } = req.query;

        let query: any = {};

        if (search) {
            query.title = { $regex: search, $options: "i" }
        }

        if (status && status !== 'all') {
            query.status = status;
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

        const events = await Event.find(query)
            .populate('category')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)

        const ongoingEvents = await Event.countDocuments({ ...query, status: 'ongoing' });
        const completedEvents = await Event.countDocuments({ ...query, status: 'completed' });
        const upcomingEvents = await Event.countDocuments({ ...query, status: 'upcoming' });

        const totalEvents = await Event.countDocuments(query);
        const totalPages = Math.ceil(totalEvents / limitNum);

        if (!events) {
            res.status(500).json({ message: "event not found!" });
            return
        }

        res.status(200).json({
            message: "Events retrieved successfully!",
            data: events,
            totalEvents,
            totalPages,
            currentPage: pageNum,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1,
            ongoingEvents,
            completedEvents,
            upcomingEvents,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    addEvent,
    editEvent,
    deleteEvent,
    getAllEvents
}