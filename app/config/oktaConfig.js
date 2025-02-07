export const oktaAuthConfig = {
    issuer: `https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2`,
    clientId: '6gs2QpO0812c0L1VB7ciRbfmvo0Dl2pm',
    // redirectUri: `${window.location.origin}/login/callback`,
    redirectUri: `http://localhost:3000/api/auth/callback`,
    
    // scopes: ["openid", "profile", "email"],
    // pkce: true,
}