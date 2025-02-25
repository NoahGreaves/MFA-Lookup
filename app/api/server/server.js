import express from 'express';
import db from './database.js';
import { authMiddleware, errorHandler } from './authMiddleware.js';

import oktaAuth from "../../oktaAuth.js";


import cors from "cors"; // Import cors
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:3001", // Allow frontend
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization, Access-Control-Allow-Credentials",
        credentials: true, // Allow cookies
    })
);

app.use(express.json());
app.use(cookieParser()); // Enables reading/writing cookies

// Login Route - Sends Token in Secure HTTP-Only Cookie
app.post("/login", (request, response) => {
    const { token } = request.body;

    if (!token) {
        return response.status(400).json({ error: "Token is required" });
    }

    // store token in cookie
    response.cookie("authToken", token, {
        httpOnly: true,   // Prevents JavaScript access
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict", // Prevents CSRF attacks
    });

    response.json({ message: "Authenticated successfully" });
});

// Logout - Clears the Cookie
app.post("/logout", (request, response) => {
    const token = request.cookies.authToken;
    response.clearCookie("authToken");
    response.json({ message: "Logged out" });
});

// Protected Routes - Reads Token from Cookie
app.get("/time", async (request, response) => {
    const token = request.cookies.authToken;
    if (!token) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    try {
        const result = await db.query("SELECT NOW()");
        response.json({ server_time: result[0] });
    } catch (err) {
        response.status(500).json({ error: "Database query failed" });
    }
    //res.json({ time: new Date().toISOString() });
});

app.get("/search", async (request, response) => {
    console.log("🔥 Received API request!");
    const token = request.cookies.authToken;
    
    if (!token) 
        return response.status(401).json({ error: "Unauthorized" });
    
    try {
        
        const filters = request.query;
        console.log("Received filters:", filters);

        const query = "SELECT * FROM atb WHERE name ILIKE $1 OR email ILIKE $2";
        const values = [`%${filters.name || ''}%`, `%${filters.email || ''}%`];

        console.log("📝 Executing Query:", query);
        console.log("🔢 Query Values:", values);

        const result = await db.query(query, values);

        console.log("✅ Database Query Result:", result); // Debugging database result
        
        // if (!result.rows || result.rows.length === 0) {
        if (!result) {
            console.warn("⚠️ No result found!");
            return response.status(404).json({ message: "No results found" });
        }

        response.json({ server_result: result });
        
    } catch (err) {
        console.error("Error fetching result:", err);
        response.status(500).json({ error: "Internal server error" });
    }
    //res.json({ time: new Date().toISOString() });
});

// Public route (No auth required)
app.get("/", (request, response) => {
    response.send("Welcome to the API!");
});

// Use error handler to return JSON
app.use(errorHandler);

// Gracefully close database connection on shutdown
process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
