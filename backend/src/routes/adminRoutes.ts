import express from "express";
const router = express.Router();
import authenticateUser from "../middlewares/authMiddleware";
const adminController = require("../controllers/admin/adminController");
const categoryController = require("../controllers/admin/categoryController");
const eventController = require("../controllers/admin/eventController");

// Login Management

router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

// Category Management

router.post("/addCategory", authenticateUser(["admin"]), categoryController.addCategory);
router.post("/editCategory/:id", authenticateUser(["admin"]), categoryController.editCategory);
router.patch("/categoryStatus/:id", authenticateUser(["admin"]), categoryController.toggleCategoryStatus);
router.delete("/deleteCategory/:id", authenticateUser(["admin"]), categoryController.deleteCategory);
router.get("/categories", authenticateUser(["admin"]), categoryController.getAllCategories);

// Product Management

router.post("/addEvent", authenticateUser(["admin"]), eventController.addEvent);
router.put("/editEvent/:id", authenticateUser(["admin"]), eventController.editEvent);
router.delete("/event/:id", authenticateUser(["admin"]), eventController.deleteEvent);
router.get("/events", authenticateUser(["admin"]), eventController.getAllEvents);

module.exports = router;

 