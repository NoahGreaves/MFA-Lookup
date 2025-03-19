import express from 'express';
import db from './database.js';
import { authMiddleware, errorHandler } from './authMiddleware.js';

import axios from 'axios';
import url from 'node:url';
import qs from 'qs';
import crypto from 'node:crypto';

import oktaAuth from "../../oktaAuth.js";

import OktaJwtVerifier from '@okta/jwt-verifier';

import cors from "cors"; // Import cors
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'http://localhost:3000';

const AUTH_TOKEN = "authToken";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/',
    // issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2/default',
});

let codeVerifier;
let codeChallenge;

// Generate a random code verifier
function generateCodeVerifier() {
  const array = crypto.randomBytes(32);
  return array.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Generate a code challenge (SHA-256 hash of the code verifier)
function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return hash.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Assign values to global variables
codeVerifier = generateCodeVerifier();
codeChallenge = generateCodeChallenge(codeVerifier);

console.log("Code Verifier:", codeVerifier);
console.log("Code Challenge:", codeChallenge);


app.use(
    cors({
        origin: "http://localhost:3001", // Allow frontend
        methods: "GET, POST, PUT, DELETE",
        // allowedHeaders: "Content-Type, Authorization, Access-Control-Allow-Credentials",
        allowedHeaders: "Content-Type, Authorization, Access-Control-Allow-Credentials, Origin, X-Requested-With, Accept",
        credentials: true, // Allow cookies
    })
);

app.use(express.json());
app.use(cookieParser()); // Enables reading/writing cookies`

// Route that the AuthCode is sent to 
// --> Redirect? to /token route to post Okta for Access, ID, and Refresh Tokens 
app.get("/authorize", (req, res) => {
    console.log("[Server] AUTHORIZE CALLED: " + req.url);
    const authCode = req.query.code;
    console.log("Auth Code: " + authCode);
    res.redirect(307, url.format({
        pathname: "/token",
        query: req.query,
    })); // redirect to /token route
});



///
/// TODO: codeVerifier needs to be sent with the /authorize call to generate an code challenge
///
app.get("/token", (req, res) => {
    console.log("Token Route");
    const authCode = req.query.code;
    console.log(authCode);

    let data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': `${authCode}`,
        'client_id': 'JiaFtfAPdFW3rArItaQfWNFTxRo2LDxx',
        'client_secret': '',
        'redirect_uri': 'http://localhost:3000/authorize',
        'code_verifier': `${codeVerifier}`,
        'code_challenge_method': 'S256',
        'code_challenge': `${codeChallenge}`,
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            // return res.send(response.data);;
        })
        .catch((error) => {
            console.log(error);
        });
});

// Login Route - Sends Token in Secure HTTP-Only Cookie
app.post("/login", (request, response) => {
    console.log("[Server] LOGIN CALLED");
    const { accessToken: token } = request.body;
    // const { "Authorization": token } = request.header;

    console.log("Login Token " + token);

    if (!token) {
        return response.status(400).json({ error: "Token is required" });
    }

    oktaJwtVerifier.verifyAccessToken(token, `https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/`)
        .then(async jwt => {
            console.log("JWT: " + jwt)

            // store token in cookie
            response.cookie(AUTH_TOKEN, token, {
                httpOnly: true,   // Prevents JavaScript access
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                //sameSite: "Strict", // Prevents CSRF attacks, only allows cookies from same-origin requests
                //sameSite: "None; Secure", // accepts cookies from anywhere
                maxAge: 36000,
            });

            return response.json({ message: "Authenticated successfully" });

            //response.send();
        })
        .catch(err => {
            // Logout user and redirect them to Login and request a new token

            console.warn('token failed validation: ' + err)
            return response.status(401).json({ error: "Unauthorized" });
        });
});

// Logout - Clears the Cookie
app.get("/logout", (request, response) => {
    //const token = request.cookies.authToken;
    response.clearCookie(AUTH_TOKEN);
    response.json({ message: "Logged out" });
});

// Route for getting all the cookies
app.get('/getcookie', function (req, res) {
    res.send(req.cookies);
})


// app.post("/time", async (request, response) => {
app.get("/time", async (request, response) => {
    const token = request.cookies;
    // const { accessToken: token } = request.body;
    console.log("time Token " + token);


    if (!token) {
        return response.status(401).json({ error: "No Token" });
    }

    // Verify Token
    // oktaJwtVerifier.verifyAccessToken(token, `https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/`)
    //     .then(async jwt => {
    //         console.log("JWT: " + jwt)

    //         try {
    //             const result = await db.query("SELECT NOW()");
    //             response.json({ server_time: result[0] });
    //         } catch (err) {
    //             response.status(500).json({ error: "Database query failed" });
    //         }

    //         return response;
    //         //response.json({ message: "Authenticated successfully" });
    //     })
    //     .catch(err => {
    //         console.warn('token failed validation: ' + err)
    //         return response.status(401).json({ error: "Unauthorized" });
    //     });
});

app.get("/search", async (request, response) => {
    console.log("🔥 Received API request!");
    const token = request.cookies.AUTH_TOKEN;

    console.log(token);

    oktaJwtVerifier.verifyAccessToken(token, 'https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2/default')
        .then(async jwt => {
            // console.log('token is valid')
            console.log(jwt.claims)
            // try{
            //     const filters = request.query;
            //     console.log("Received filters:", filters);

            //     // Fix query
            //     const query = "SELECT * FROM atb WHERE $1 ILIKE $2";
            //     const values = [`%${filters.searchMethod || ''}%`, `%${filters.search || ''}%`];

            //     //console.log(filters.searchMethod);

            //     console.log("📝 Executing Query:", query);
            //     console.log("🔢 Query Values:", values);

            //     const result = await db.query(query, values);

            //     if (!result) {
            //         console.warn("⚠️ No result found!");
            //         return response.status(404).json({ message: "No results found" });
            //     }

            //     console.log("✅ Database Query Result:", result);
            //     response.json({ server_result: result });

            // } catch (err) {
            //     console.error("Error fetching result:", err);
            //     response.status(500).json({ error: "Internal server error" });
            // }
        })
        .catch(err => {
            console.warn('token failed validation: ' + err)
            return response.status(401).json({ error: "Unauthorized" });

        });
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
    //response.clearCookie(AUTH_TOKEN);

    await db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
