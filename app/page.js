'use client'


import SearchBar from "./Componenets/search-bar";
import SearchButton from "./Componenets/search-button";
import Header from "./Componenets/header";

import ProfileClient from "./Componenets/ProfileClient";
import ProfileServer from "./Componenets/ProfileServer";

import AuthenticationButton from './Componenets/AuthenticationButton';
// import { useNavigate } from "react-router-dom"; 
// TO TEST RUN ADMIN CMD PROMT AND USE COMMAND -- npm run dev --
// STARTS LOCAL SERVER TO TEST REACT APP

import "./css/page.css";

export default function HomePage() {

  return (
    <div>
      <div className="containerColumn">
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />

        {/* Login and Logout buttons */}
        <div className="containerRow">
          <a className="button" href="/api/auth/login">Login</a>
          <a className="button" href="/api/auth/logout">Logout</a>

        </div>
        <ProfileClient></ProfileClient>
        <SearchBar className="inputFieldStyle" />
      </div>
    </div>
  );
}