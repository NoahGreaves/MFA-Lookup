import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { sendTokenToBackend } from "../api/utils/authService";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: '../../../.env' });

let hasAuthenticated = false;

export const LoginButton = ({ styleClass }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  async function login() {
    const response = await fetch('http://localhost:3000/auth/initiate');
    const data = await response.json();
    window.location.href = data.url;
  }

  if (isLoading) return <div>Loading Login Button</div>
  // if (!isAuthenticated) return <button className={styleClass} onClick={() => {loginWithRedirect()}} >Log In</button>;
  if (!isAuthenticated) return <button className={styleClass} onClick={() => login()}>Log In</button>;
  if (isAuthenticated && hasAuthenticated) return <></>


  if (isAuthenticated && !hasAuthenticated) {
    // const setToken = async () => {
    //   //getTokenSilentley();


    //   // Get Auth Code from /authorize
    //   // const authRespone = getAuthCode();
    //   // console.log("Auth Response " + authRespone);
    //   // Pass Auth Code from getAuth to get token
    //   // getToken();


    // }

    // setToken();
    // hasAuthenticated = true;
    return <></>;
  }
  else
    return <></>;

};