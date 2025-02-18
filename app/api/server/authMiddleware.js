import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config({ path: '../../../.env' });

const authMiddleware = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `${process.env.OKTA_ISSUER}/v1/keys`,
    }),
    audience: process.env.OKTA_AUDIENCE,
    issuer: `${process.env.OKTA_ISSUER}`,
    algorithms: ["RS256"],
});

// Error Handling to throw JSON errors
const errorHandler = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    next(err);
};


export { authMiddleware, errorHandler };