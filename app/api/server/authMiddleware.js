import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import OktaJwtVerifier from '@okta/jwt-verifier';


const client = jwksClient({
    jwksUri: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/.well-known/jwks.json',
    // jwksUri: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/',
});

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/',
});

const getKey = (header, callback) => {

    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

export const authenticateToken = (req, res, next) => {
    const token = req.cookies["access_token"]; // assuming you're storing the token in a secure httpOnly cookie
    console.log("[authMiddleware] access_token: " + token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    oktaJwtVerifier.verifyAccessToken(token, 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/')
        .then(jwt => {
            console.log('token is valid')
            next();
            return res.status(200).json({ message: 'Token verification Success' })
        })
        .catch(err => {
            return res.status(403).json({ message: 'Token verification failed', error: err });
        });

    // jwt.verify(
    //     token,
    //     getKey,
    //     {
    //         algorithms: ['RS256'], // Auth0 uses RS256 by default
    //         issuer: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/',
    //         audience: 'https://dev-lj2fgkappxmqsrge.us.auth0.com/api/v2/',
    //     },
    //     (err, decoded) => {
    //         if (err) {
    //             return res.status(403).json({ message: 'Token verification failed', error: err });
    //         }

    //         req.user = decoded;
    //         next();
    //     }
    // );
};
