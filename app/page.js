// 'use client'


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
      <div className="containerColumn">
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
        {/* Login / Logout Buttons */}
        <div className="containerRow">
          {/* <button className="auth-button" onClick={login}></button> */}

          {/* <AuthenticationButton></AuthenticationButton> */}

          {/* <div className="auth-button" style={buttonStyle}> */}
            <a href="/api/auth/login">Login</a>
          {/* </div> */}

          {/* <div className="auth-button" style={buttonStyle}> */}
            <a href="/api/auth/logout">Logout</a>
          {/* </div> */}
        </div>
        <ProfileClient></ProfileClient>
        {/* <ProfileServer></ProfileServer> */}
        <SearchBar className="inputFieldStyle" />
      </div>
    </div>
  );
}