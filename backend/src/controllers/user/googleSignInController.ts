import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
const User = require("../../models/userSchema");
const { generateJWT } = require("../../Utils/jwtUtils");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleSignIn = async (req: Request, res: Response) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ message: "idToken is required" });

        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) return res.status(400).json({ message: "Invalid Google token" });

        const { email, email_verified, name, picture } = payload as {
            email?: string;
            email_verified?: boolean;
            name?: string;
            picture?: string;
        };

        if (!email || !email_verified) {
            return res.status(400).json({ message: "Google account email not available or not verified" });
        }

        let user = await User.findOne({ email: email.toLowerCase() });

        if (user && user.authSource === "self") {
            return res.status(400).json({
                message:
                    "An account with this email already exists using email/password. Please login using your password or link your Google account from profile settings.",
            });
        }

        if (!user) {
            user = await User.create({
                name: name || "No name",
                email: email.toLowerCase(),
                password: "",
                avatar: picture || "",
                authSource: "google",
            });
        } else {
            let modified = false;
            if (!user.avatar && picture) {
                user.avatar = picture;
                modified = true;
            }
            if (!user.name && name) {
                user.name = name;
                modified = true;
            }
            if (modified) await user.save();
        }

        generateJWT(res, user._id.toString(), "jwt");

        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            authSource: user.authSource,
        };

        return res.status(200).json({ message: "Logged in with Google", user: safeUser });
    } catch (error) {
        console.error("googleSignIn error:", error);
        return res.status(500).json({ message: "Server error during Google signin" });
    }
};

module.exports = {
    googleSignIn,
};
