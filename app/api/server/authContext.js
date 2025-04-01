import React, { createContext, useState, useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import dotenv from "dotenv";

const AuthContext = createContext();
const env = dotenv.config({ path: '../../../.env' });

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { authState, oktaAuth } = useOktaAuth();

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://localhost:3000/auth/me', {
                credentials: 'include', // Send cookies
            });
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUser(data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }

        checkAuth();

        if (authState?.isAuthenticated) {
            setIsAuthenticated(true);
            setUser(authState.idToken.claims); // Get user claims from Okta token
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [authState]);

    const login = async () => {
        const response = await fetch('http://localhost:3000/auth/initiate');
        const data = await response.json();
        window.location.href = data.url;
    };

    const logout = async () => {
        try {
            // Call the backend proxy to revoke the access token
            const response = await fetch('http://localhost:3000/auth/revoke', {
                method: 'POST',
                credentials: 'include', // include cookies
            });

            if (response.ok) {
                const data = await response.json();
                if (data.logoutUrl) {
                    // Perform the browser redirect to the logout URL
                    window.location.href = data.logoutUrl;
                } else {
                    console.error("No logout URL returned from server.");
                }
            } else {
                const errorData = await response.json();
                console.error("Logout failed:", errorData);
            }
            
    

            // Log out of the app session (clearing local state)
            // await fetch('http://localhost:3000/auth/logout', {
            //     method: 'POST',
            //     credentials: 'include',
            // });

            // Clear local state
            setIsAuthenticated(false);
            setUser(null);

            // Redirect to login page after successful logout
            // window.location.href = 'http://localhost:3001';
        } catch (error) {
            console.error('Error during logout:', error);
        }



        // console.log(useOktaAuth)
        // await oktaAuth.signOut();

        // try {
        //     await fetch('http://localhost:3000/auth/revoke', {})
        // } catch (err) {}

        // try {

        //     // Log out of App Session
        //     await fetch('http://localhost:3000/auth/logout', {
        //         method: 'POST',
        //         credentials: 'include',
        //     });

        //     // Clear local application state
        //     setIsAuthenticated(false);
        //     setUser(null);

        //     // window.location.href = `https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2/default/v2/logout`;
        //     // window.location.href = `${process.env.OKTA_ISSUER}/logout`;
        // } catch (error) {
        //     console.log("Error during App Logout");
        // }
        // setIsAuthenticated(false);
        // setUser(null);
        //window.location.href = 'http://localhost:3001';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};