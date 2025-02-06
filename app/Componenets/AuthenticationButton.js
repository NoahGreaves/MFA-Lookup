'use client'

import React from 'react';
import { Security, useOktaAuth } from '@okta/okta-react';
import { BrowserRouter } from 'react-router-dom';

export default function AuthenticationButton() {

    const { oktaAuth, authState } = useOktaAuth();

    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut('/');

    const buttonStyle =
    {
        backgroundColor: 'red',
        border: '2px solid blue',
        width: 50,
        height: 50
    }

    if (!authState) {
        return <div>Loading...</div>;
    }

    if (!authState.isAuthenticated) {
        return (
            <Security oktaAuth={this.oktaAuth}>
                <BrowserRouter>
                    <div>
                        <p>Not Logged in yet</p>
                        <button style={buttonStyle} onClick={login}>Login</button>
                    </div>
                </BrowserRouter>
            </Security>
        );
    }

    return (
        <div>
            <p>Logged in!</p>
            <button style={buttonStyle} onClick={logout}>Logout</button>
        </div>
    );

    // let authStatus = 0;
    // let authURI = "api/auth/login";
    // if(authStatus === 1){}

    // return (
    //     <>
    //         <div className="auth-button" style={buttonStyle}>
    //             <a href={authURI}>Logout</a>
    //         </div>
    //     </>
    // );

}