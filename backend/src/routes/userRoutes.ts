import express from "express";
import authenticateUser from "../middlewares/authMiddleware";
const router = express.Router();
const userController = require("../controllers/user/authController");
const bookmarkController = require("../controllers/user/bookmarkController");
const reviewController = require("../controllers/user/reviewController");

// Login Management

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUser", authenticateUser(["user"]), userController.getUserInfo);
router.post("/logout", userController.logoutUser);

// Bookmark Management

router.post("/addToBookmark", authenticateUser(["user"]), bookmarkController.addToBookmark);
router.delete("/removeBookmark", authenticateUser(["user"]), bookmarkController.removeFromBookmark);
router.get("/bookmarks", authenticateUser(["user"]), bookmarkController.getBookmarks);

// Review Management

router.post("/createReview", authenticateUser(["user"]), reviewController.createReview);

module.exports = router;