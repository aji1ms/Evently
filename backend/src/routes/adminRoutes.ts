import express from "express";
const router = express.Router();
import authenticateUser from "../middlewares/authMiddleware";
const adminController = require("../controllers/admin/adminController");
const categoryController = require("../controllers/admin/categoryController");

// Login Management

router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

// Category Management

router.post("/addCategory", authenticateUser(["admin"]), categoryController.addCategory);
router.post("/editCategory/:id", authenticateUser(["admin"]), categoryController.editCategory);
router.delete("/deleteCategory/:id", authenticateUser(["admin"]), categoryController.deleteCategory);
router.get("/categories", authenticateUser(["admin"]), categoryController.getAllCategories);

module.exports = router;

