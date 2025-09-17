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
            regularPrice,
            salePrice,
            totalSeats,
            availableSeats,
            image,
            organizer,
            status,
        } = req.body;

        if (!title || !description || !category || !eventType || !eventDate ||
            !eventTime || !regularPrice || !salePrice || !totalSeats ||
            !availableSeats || !image || !organizer) {
            res.status(400).json({ message: "All required fields must be provided!" });
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
            image: image?.trim() || "",
            organizer: organizer.trim(),
            status,
        });

        await newEvent.save();

        res.status(201).json({ message: "Event created successfully!" });
    } catch (error) {
        console.error("Error creating event:", error);
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
            image,
            organizer,
            status,
        } = req.body;

        if (!title || !description || !category || !eventType || !eventDate ||
            !eventTime || !regularPrice || !salePrice || !totalSeats ||
            !availableSeats || !image || !organizer || !status) {
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

        if (salePrice !== undefined && regularPrice !== undefined && salePrice > regularPrice) {
            res.status(400).json({ message: "Sale price cannot be greater than regular price!" });
            return;
        }

        if (availableSeats !== undefined && totalSeats !== undefined && availableSeats > totalSeats) {
            res.status(400).json({ message: "Available seats cannot exceed total seats!" });
            return;
        }

        const currentDate = new Date();
        const inputDate = new Date(eventDate);
        if (inputDate <= currentDate) {
            res.status(400).json({ message: "Event date must be in future!" });
            return;
        }

        const updateEvent: any = {
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
            image: image?.trim() || "",     
            organizer: organizer.trim(),
            status,
        }

        const updatedEvent = await Event.findOneAndReplace({ _id: id }, updateEvent, { new: true, runValidators: true, overwrite: true });

        if (!updatedEvent) {
            res.status(404).json({ message: "Event not found!" });
            return;
        }                                                                                                     

        res.status(200).json({ message: "Event updated successfully!" });
    } catch (error) {
        console.error("Error editing event:", error);
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
        console.log("Error deleting event: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Events

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        let query: any = {};

        if (search) {
            query.title = { $regex: search, $options: "i" }
        }

        const events = await Event.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Events retrieved successfully!",
            data: events,
            count: events.length
        });
    } catch (error) {
        console.log("Error getting event: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    addEvent,
    editEvent,
    deleteEvent,
    getAllEvents
}