import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from 'express';
import authenticateUser from "../middlewares/authMiddleware";
const adminController = require("../controllers/admin/adminController");
const userController = require("../controllers/admin/userController");
const categoryController = require("../controllers/admin/categoryController");
const { uploadEventImage } = require("../config/cloudinary");
const eventController = require("../controllers/admin/eventController");
const notificationController = require("../controllers/admin/notificationController");
const reviewController = require("../controllers/admin/reviewController");
const bookingController = require("../controllers/admin/bookingController");
const reportController = require("../controllers/admin/reportController");
const dashboardController = require("../controllers/admin/dashboardController");

// Login Management

router.post("/login", adminController.adminLogin);
router.get("/getAdmin", authenticateUser(["admin"], "adminToken"), adminController.getAdminInfo);
router.post("/logout", authenticateUser(["admin"], "adminToken"), adminController.adminLogout);

// User Management

router.get("/users", authenticateUser(["admin"], "adminToken"), userController.userInfo);
router.patch("/userStatus/:id", authenticateUser(["admin"], "adminToken"), userController.toggleUserStatus);
router.patch("/editUser/:id", authenticateUser(["admin"], "adminToken"), userController.editUser);

// Category Management

router.post("/addCategory", authenticateUser(["admin"], "adminToken"), categoryController.addCategory);
router.post("/editCategory/:id", authenticateUser(["admin"], "adminToken"), categoryController.editCategory);
router.patch("/categoryStatus/:id", authenticateUser(["admin"], "adminToken"), categoryController.toggleCategoryStatus);
router.delete("/deleteCategory/:id", authenticateUser(["admin"], "adminToken"), categoryController.deleteCategory);
router.get("/categories", categoryController.getAllCategories);

// Event Management

router.post("/addEvent", authenticateUser(["admin"], "adminToken"), uploadEventImage.single('image'), eventController.addEvent);
router.put("/editEvent/:id", authenticateUser(["admin"], "adminToken"), uploadEventImage.single('image'), eventController.editEvent);
router.delete("/event/:id", authenticateUser(["admin"], "adminToken"), eventController.deleteEvent);
router.get("/events", authenticateUser(["admin"], "adminToken"), eventController.getAllEvents);

// Notification Management

router.post("/createNotification", authenticateUser(["admin"], "adminToken"), notificationController.createNotification);
router.patch("/editNotification/:id", authenticateUser(["admin"], "adminToken"), notificationController.editNotification);
router.delete("/deleteNotification/:id", authenticateUser(["admin"], "adminToken"), notificationController.deleteNotification);
router.get("/notifications", authenticateUser(["admin"], "adminToken"), notificationController.getNotifications);

// Review Management

router.get("/reviews", authenticateUser(["admin"], "adminToken"), reviewController.getReviews);
router.delete("/deleteReview/:id", authenticateUser(["admin"], "adminToken"), reviewController.delteReview);

// Booking Management

router.get("/bookings", authenticateUser(["admin"], "adminToken"), bookingController.listBookings);
router.get("/bookings/:id", authenticateUser(["admin"], "adminToken"), bookingController.viewOrderDetails);

// Report & Analytics

router.get("/reports", authenticateUser(["admin"], "adminToken"), reportController.getAdminReport);

// Dashboard

router.get("/dashboard", authenticateUser(["admin"], "adminToken"), dashboardController.getAdminDashboard);

module.exports = router;