require("dotenv").config();
import { Request, Response } from "express";
const User = require("../../models/userSchema");
import { generateJWT, clearJWT } from "../../Utils/jwtUtils";


// User Registration

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// User Login

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found!" });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password!" });
            return;
        }
        const token = generateJWT(res, user._id as string);

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// User Info

const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Not authorized!" });
            return;
        }

        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get User Info Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// User Logout

const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        clearJWT(res);
        res.status(200).json({ message: "Logout successfull!" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
    logoutUser
}