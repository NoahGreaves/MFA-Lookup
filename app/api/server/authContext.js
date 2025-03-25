import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // On app load, check auth status from backend
        const checkAuth = async () => {
            try {
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
            } catch (err) {
                console.error('Error checking auth status:', err);
                setIsAuthenticated(false);
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    const login = async () => {
        const response = await fetch('http://localhost:3000/auth/initiate');
        const data = await response.json();
        window.location.href = data.url;
    };

    const logout = async () => {
        await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = 'http://localhost:3001';
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