import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { sendTokenToBackend } from "../api/utils/authService";

let hasAuthenticated = false; 
export const LoginButton = ({ styleClass }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  if (isLoading) return <div>Loading Login Button</div>
  if (!isAuthenticated) return <button className={styleClass} onClick={() => loginWithRedirect()}>Log In</button>;

  if (isAuthenticated && !hasAuthenticated) {
    const setToken = async () => {
      const token = await getAccessTokenSilently();
      await sendTokenToBackend(token);
    }

    setToken();
    hasAuthenticated = true;
    return <></>;
  }
  else
    return <></>;
  
};