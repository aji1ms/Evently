import cookieParser from "cookie-parser";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
import { createServer } from "node:http";
import { Server } from 'socket.io';
import { setupSocketHandlers } from "./src/Sockets/chatSocket";
const connectDb = require("./src/config/db");
const authRoute = require("./src/routes/userRoutes");
const adminRoute = require("./src/routes/adminRoutes");

const app = express();
const server = createServer(app);

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

const io = new Server(server, {
    cors: corsOptions,
});

setupSocketHandlers(io)

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

// User
app.use("/api/auth", authRoute);

// Admin
app.use("/api/admin", adminRoute);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`server running.....`));        
