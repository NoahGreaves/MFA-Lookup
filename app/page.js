'use client'


import SearchBar from "./Componenets/search-bar";
import SearchButton from "./Componenets/search-button";
import Header from "./Componenets/header";

import Profile from "./Componenets/Profile";

import { LoginButton } from './Componenets/loginButton';
import { LogoutButton } from "./Componenets/logoutButton";
// import { useNavigate } from "react-router-dom"; 
// TO TEST RUN ADMIN CMD PROMT AND USE COMMAND -- npm run dev --
// STARTS LOCAL SERVER TO TEST REACT APP

import { Auth0Provider } from '@auth0/auth0-react';

import "./css/page.css";

export default function HomePage() {

  // useEffect(() => {
  //   const allWithClass = Array.from(
  //     document.getElementsByClassName('auth-button')
  //   );
  //   console.log(allWithClass);
  // }, []);

  // const login = () => {
  //   console.log("cliked")
  //   navigate("/api/auth/login"); {/* navigate to desired page */ }
  // };

  // const logout = () => {
  //   navigate("/api/auth/logout");
  // };

  return (
    <div>
      <Auth0Provider
        domain="dev-lj2fgkappxmqsrge.us.auth0.com"
        clientId="JiaFtfAPdFW3rArItaQfWNFTxRo2LDxx"
        authorizationParams={{
          redirect_uri: window.location.origin
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