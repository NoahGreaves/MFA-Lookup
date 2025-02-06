// 'use client'

import { BrowserRouter } from 'react-router-dom';

import SearchBar from "./search-bar";
import SearchButton from "./search-button";
import Header from "./header";

import ProfileClient from "./ProfileClient";
import ProfileServer from "./ProfileServer";


// import { useNavigate } from "react-router-dom"; 
// TO TEST RUN ADMIN CMD PROMT AND USE COMMAND -- npm run dev --
// STARTS LOCAL SERVER TO TEST REACT APP

export default function HomePage() {
  const containerRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const containerColumn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  const inputFieldStyle = {
    // width: '50%',
    // height: '75px',
    padding: '12px 20px',
    boxSizing: 'border-box',
    border: '2px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
    fontSize: '16px',
    resize: 'none',
  }

  const buttonStyle = {
    margin: '5%'
  }

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
      <div style={containerColumn}>
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
        {/* Login / Logout Buttons */}
        <div style={containerRow}>
          {/* <button className="auth-button" onClick={login}></button> */}

          <div className="auth-button" style={buttonStyle}>
            <a href="/api/auth/login">Login</a>
          </div>

          <div className="auth-button" style={buttonStyle}>
            <a href="/api/auth/logout">Logout</a>
          </div>
        </div>
        <ProfileClient></ProfileClient>
        {/* <ProfileServer></ProfileServer> */}
        <SearchBar style={inputFieldStyle} />
      </div>
    </div>
  );
}