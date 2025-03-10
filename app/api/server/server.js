import express from 'express';
import db from './database.js';
import { authMiddleware, errorHandler } from './authMiddleware.js';

import oktaAuth from "../../oktaAuth.js";

import OktaJwtVerifier from '@okta/jwt-verifier';

import cors from "cors"; // Import cors
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'http://localhost:3000';

const oktaJwtVerifier = new OktaJwtVerifier({
    // issuer: `${process.env.OKTA_ISSUER}`,
    issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2/default',
    // clientId: `${process.env.OKTA_CLIENT_ID}`
});

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
    console.log(request.body);
    const { accessToken: token } = request.body;
    // const token = request.body;
    if (!token) {
        return response.status(400).json({ error: "Token is required" });
    }

    // oktaJwtVerifier.verifyAccessToken(token, 'http://localhost:3000')
    oktaJwtVerifier.verifyAccessToken(token, `https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/`)
        .then(async jwt => {
            console.log("JWT: " + jwt)

            // store token in cookie
            response.cookie("authToken", token, {
                httpOnly: true,   // Prevents JavaScript access
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                sameSite: "Strict", // Prevents CSRF attacks
            });

            response.json({ message: "Authenticated successfully" });
        })
        .catch(err => {
            console.warn('token failed validation: ' + err)
            return response.status(401).json({ error: "Unauthorized" });
        });


    // // store token in cookie
    // response.cookie("authToken", token, {
    //     httpOnly: true,   // Prevents JavaScript access
    //     secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    //     sameSite: "Strict", // Prevents CSRF attacks
    // });

    // response.json({ message: "Authenticated successfully" });
});

// Logout - Clears the Cookie
app.post("/logout", (request, response) => {
    //const token = request.cookies.authToken;
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
});

app.get("/search", async (request, response) => {
    console.log("🔥 Received API request!");
    const token = request.cookies.authToken;

    // //checkIsTokenValid(token);
    // // oktaJwtVerifier.verifyAccessToken(token, 'api://default')
    // //console.log(authMiddleware);
    // oktaJwtVerifier.verifyAccessToken(token, 'api://default')
    //     .then(async jwt => {
    //         // console.log('token is valid')
    //         console.log(jwt.claims)
    //         // try{
    //         //     const filters = request.query;
    //         //     console.log("Received filters:", filters);

    //         //     // Fix query
    //         //     const query = "SELECT * FROM atb WHERE $1 ILIKE $2";
    //         //     const values = [`%${filters.searchMethod || ''}%`, `%${filters.search || ''}%`];

    //         //     //console.log(filters.searchMethod);

    //         //     console.log("📝 Executing Query:", query);
    //         //     console.log("🔢 Query Values:", values);

    //         //     const result = await db.query(query, values);

    //         //     if (!result) {
    //         //         console.warn("⚠️ No result found!");
    //         //         return response.status(404).json({ message: "No results found" });
    //         //     }

    //         //     console.log("✅ Database Query Result:", result);
    //         //     response.json({ server_result: result });

    //         // } catch (err) {
    //         //     console.error("Error fetching result:", err);
    //         //     response.status(500).json({ error: "Internal server error" });
    //         // }
    //     })
    //     .catch(err => {
    //         console.warn('token failed validation: ' + err)
    //         return response.status(401).json({ error: "Unauthorized" });

    //     });
});

// Public route (No auth required)
app.get("/", (request, response) => {
    response.send("Welcome to the API!");
});

// Use error handler to return JSON
app.use(errorHandler);

// Gracefully close database connection on shutdown
process.on('SIGINT', async () => {

    // clear cookies

    await db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// API Functionality
const checkIsTokenValid = (token) => {

}