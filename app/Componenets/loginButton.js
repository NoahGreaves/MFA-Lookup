import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = ({ styleClass }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if(isLoading) return <div>Loading...</div>
  if(!isAuthenticated) return <button className={styleClass} onClick={() => loginWithRedirect()}>Log In</button>;
  if(isAuthenticated) return <></>
};