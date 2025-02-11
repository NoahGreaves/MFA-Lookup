'use client'

import SearchBar from "./Componenets/search-bar";
import Header from "./Componenets/header";

import Profile from "./Componenets/Profile";

import { LoginButton } from './Componenets/loginButton';
import { LogoutButton } from "./Componenets/logoutButton";

import { Auth0Provider } from '@auth0/auth0-react';

import "./css/page.css";

export default function HomePage() {

  return (
    <div>
      <Auth0Provider
        domain="dev-lj2fgkappxmqsrge.us.auth0.com"
        clientId="JiaFtfAPdFW3rArItaQfWNFTxRo2LDxx"
        authorizationParams={{
          redirect_uri: window.location.origin
          // redirect_uri: 'http://localhost'
        }}
      >
        <div className="containerColumn">
          <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
          <div className="containerRow">
            {/* Login / Logout Buttons */}
              <LoginButton styleClass="auth-button"></LoginButton>
              <LogoutButton styleClass="auth-button"></LogoutButton>
          </div>

          <Profile></Profile>

          <SearchBar className="inputFieldStyle" />
        </div>
      </Auth0Provider>
    </div>
  );
}