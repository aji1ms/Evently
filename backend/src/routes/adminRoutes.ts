import express from "express";
const router = express.Router();
import authenticateUser from "../middlewares/authMiddleware";
const adminController = require("../controllers/admin/adminController");
const userController = require("../controllers/admin/userController");
const categoryController = require("../controllers/admin/categoryController");
const eventController = require("../controllers/admin/eventController");
const notificationController = require("../controllers/admin/notificationController")
const reviewController = require("../controllers/admin/reviewController")

// Login Management

router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

// User Management

router.get("/users", authenticateUser(["admin"]), userController.userInfo);
router.patch("/userStatus/:id", authenticateUser(["admin"]), userController.toggleUserStatus);
router.patch("/editUser/:id", authenticateUser(["admin"]), userController.editUser);

// Category Management

router.post("/addCategory", authenticateUser(["admin"]), categoryController.addCategory);
router.post("/editCategory/:id", authenticateUser(["admin"]), categoryController.editCategory);
router.patch("/categoryStatus/:id", authenticateUser(["admin"]), categoryController.toggleCategoryStatus);
router.delete("/deleteCategory/:id", authenticateUser(["admin"]), categoryController.deleteCategory);
router.get("/categories", authenticateUser(["admin"]), categoryController.getAllCategories);

// Event Management

router.post("/addEvent", authenticateUser(["admin"]), eventController.addEvent);
router.put("/editEvent/:id", authenticateUser(["admin"]), eventController.editEvent);
router.delete("/event/:id", authenticateUser(["admin"]), eventController.deleteEvent);
router.get("/events", authenticateUser(["admin"]), eventController.getAllEvents);

// Notification Management

router.post("/createNotification", authenticateUser(["admin"]), notificationController.createNotification);
router.patch("/editNotification/:id", authenticateUser(["admin"]), notificationController.editNotification);
router.delete("/deleteNotification/:id", authenticateUser(["admin"]), notificationController.deleteNotification);
router.get("/notifications", authenticateUser(["admin"]), notificationController.getNotifications);

// Review Management

router.get("/reviews", authenticateUser(["admin"]), reviewController.getReviews);
router.delete("/deleteReview/:id", authenticateUser(["admin"]), reviewController.delteReview);


module.exports = router;