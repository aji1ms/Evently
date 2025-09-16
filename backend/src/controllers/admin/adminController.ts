import { Request, Response } from "express";
const User = require("../../models/userSchema");
import { generateJWT, clearJWT } from "../../Utils/jwtUtils";

// Admin Login

const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const admin = await User.findOne({ isAdmin: true, role: "admin", email });
        if (!admin) {
            res.status(400).json({ message: "Admin not found!" });
            return;
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password!" })
        }
        const token = generateJWT(res, admin._id as string);

        res.status(200).json({ message: "Login successfull!" });
    } catch (error) {
        console.log("Admin login error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Admin Logout

const adminLogout = async (req: Request, res: Response): Promise<void> => {
    try {
        clearJWT(res);
        res.status(200).json({ message: "Logout successfull!" });
    } catch (error) {
        console.log("Admin logout error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    adminLogin,
    adminLogout
}