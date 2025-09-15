import cookieParser from "cookie-parser";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/db");
const authRoute = require("./src/routes/userRoutes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use(express.json());
app.use(cookieParser());

connectDb();

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));      