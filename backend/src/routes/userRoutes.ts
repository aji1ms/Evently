import express from "express";
import authenticateUser from "../middlewares/authMiddleware";
const router = express.Router();
const userController = require("../controllers/user/authController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUser", authenticateUser, userController.getUserInfo);
router.post("/logout", userController.logoutUser);

module.exports = router;