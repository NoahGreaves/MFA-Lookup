import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { sendTokenToBackend } from "../api/utils/authService";
import dotenv from "dotenv";

dotenv.config({ path: '../../../.env' });

let hasAuthenticated = false;

export const LoginButton = ({ styleClass }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  if (isLoading) return <div>Loading Login Button</div>
  if (!isAuthenticated) return <button className={styleClass} onClick={() => loginWithRedirect()}>Log In</button>;

  if (isAuthenticated && !hasAuthenticated) {
    const setToken = async () => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://dev-lj2fgkappxmqsrge.us.auth0.com/oauth2/default`,
          redirect_uri: `http://localhost:3000`
        },
      });

      console.log(accessToken)
      await sendTokenToBackend(accessToken);
    }

    setToken();
    hasAuthenticated = true;
    return <></>;
  }
  else
    return <></>;

};