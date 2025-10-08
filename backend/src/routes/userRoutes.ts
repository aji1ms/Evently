import express from "express";
import authenticateUser from "../middlewares/authMiddleware";
const router = express.Router();
const userController = require("../controllers/user/authController");
const bookmarkController = require("../controllers/user/bookmarkController");
const reviewController = require("../controllers/user/reviewController");
const checkoutController = require("../controllers/user/checkoutController");
const bookingController = require("../controllers/user/bookingController");
const eventController = require("../controllers/user/eventController");

// Login Management

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUser", authenticateUser(["user"], "userToken"), userController.getUserInfo);
router.post("/logout", authenticateUser(["user"], "userToken"), userController.logoutUser);

// Event Management

router.get("/loadEvents", eventController.loadEvents);
router.get("/events", eventController.getAllEvents);

// Bookmark Management

router.post("/addToBookmark", authenticateUser(["user"], "userToken"), bookmarkController.addToBookmark);
router.delete("/removeBookmark", authenticateUser(["user"], "userToken"), bookmarkController.removeFromBookmark);
router.get("/bookmarks", authenticateUser(["user"], "userToken"), bookmarkController.getBookmarks);

// Review Management

router.post("/createReview", authenticateUser(["user"], "userToken"), reviewController.createReview);

// Checkout Management

router.post("/checkout", authenticateUser(["user"], "userToken"), checkoutController.checkout);

// Booking Managment

router.get("/bookings", authenticateUser(["user"], "userToken"), bookingController.getBookings);
router.get("/booking/:id", authenticateUser(["user"], "userToken"), bookingController.bookingDetails);

module.exports = router;                                             