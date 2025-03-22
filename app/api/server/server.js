import express from 'express';
import db from './database.js';
import { authenticateToken } from './authMiddleware.js';

import axios from 'axios';
import qs from 'qs';
import crypto from 'node:crypto';

import oktaAuth from "../../oktaAuth.js";

import OktaJwtVerifier from '@okta/jwt-verifier';

import cors from "cors"; // Import cors
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';


const app = express();
const PORT = process.env.PORT || 3000;


// ====== Tools & Operations ======

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/',
});

// Generate a random code verifier
const generateCodeVerifier = () => {
  const array = crypto.randomBytes(32);
  return array.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Generate a code challenge (SHA-256 hash of the code verifier)
const generateCodeChallenge = (codeVerifier) => {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return hash.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Generate random state
const generateState = () => {   // The spread operator (...) uses each bit as an argument to stringFromCharCode
    return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
}

const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);
const state = generateState();

// ====== SERVER ======

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

const clientId = 'JiaFtfAPdFW3rArItaQfWNFTxRo2LDxx';
const redirectUri = 'http://localhost:3000/token';
const oktaDomain = 'dev-lj2fgkappxmqsrge.us.auth0.com';

app.get('/auth/initiate', (req, res) => {
  const authUrl = `https://${oktaDomain}/authorize?` +
                  `client_id=${clientId}&` +
                  `response_type=code&` +
                  `scope=openid&` +
                  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
                  `state=${state}&` +
                  `code_challenge_method=S256&` +
                  `code_challenge=${codeChallenge}`;

  res.json({ url: authUrl });
    // res.redirect(authUrl);
});

app.get("/token", async (req, res) => {
    console.log("Token Route");
    const authCode = req.query.code;
    console.log("AuthCode: " + authCode);
    
    let data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': `${authCode}`,
        'client_id': `${clientId}`,
        'client_secret': '',
        'redirect_uri': `${redirectUri}`,
        'code_verifier': `${codeVerifier}`,
        'code_challenge_method': 'S256',
        'code_challenge': `${codeChallenge}`,
    });

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log("Response Raw Token: " + response.data.access_token);
            res.cookie('access_token', JSON.stringify(response.data.access_token), {
                httpOnly: true,
                secure: true, // true in production with HTTPS
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000, // 1 hour or whatever your expiry is
            });
            
            
            res.redirect('http://localhost:3001');
        })
        .catch((error) => {
            if (error.response) {
                console.error('Error details:', error.response.status, error.response.data);
              } else {
                console.error('Error in request:', error.message);
              }
        });

});

app.get('/auth/me', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        // NOT VERIFYING TOKEN
        // console.log(token);
        const decoded = jwt.decode(token); 
        res.json({ user: decoded });
    } catch (err) {
        console.error('Error decoding token:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Logout - Clears the Cookie
app.post('/auth/logout', (req, res) => {
    console.log("Logout Called");
    // console.log(req.cookies.access_token);
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
    res.send();
});

// Route for getting all the cookies
app.get('/getcookie', function (req, res) {
    res.send(req.cookies);
})


// app.get("/time", async (request, response) => {
app.get("/time", authenticateToken, async (request, response) => {
    console.log("[Server] Time Called");
    response.json({
        message: 'This is protected data!',
        user: req.user, // user info from validated JWT
    });

    // oktaJwtVerifier.verifyAccessToken(request.cookies.access_token, `https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/`)
    // .then(() => {
    // res.json({
    //     message: 'This is protected data!',
    //     user: req.user, // user info from validated JWT
    // });
    // }).catch((err) => {console.log(err)});

    //res.send();
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
// app.use(errorHandler);

// Gracefully close database connection on shutdown
process.on('SIGINT', async () => {

    // clear cookies
    //response.clearCookie(AUTH_TOKEN);

    await db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
