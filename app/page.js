'use client'

import SearchBar from "./Componenets/search-bar";
import Header from "./Componenets/header";

import { ProtectedData } from "./Componenets/protectedData";

import Profile from "./Componenets/Profile";
import { QueryResult } from "./Componenets/queryResult";

import { LoginButton } from './Componenets/loginButton';
import { LogoutButton } from "./Componenets/logoutButton";
import { AuthProvider } from "./api/server/authContext";

import { Auth0Provider } from '@auth0/auth0-react';

import "./css/page.css";

export default function HomePage() {

  return (
    <div>
      <AuthProvider>
        <div className="containerColumn">
          <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
          

          <LoginButton styleClass="auth-button"></LoginButton>
          <LogoutButton styleClass="auth-button"></LogoutButton>

          {/* Time Display */}
          <ProtectedData></ProtectedData>
          
          <QueryResult></QueryResult>
        </div>
        </AuthProvider>
    </div>
  );
}