import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { isLoading, isAuthenticated, logout } = useAuth0();
  if(isLoading) 
    return <div>Loading...</div>

  if(isAuthenticated) return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );

  return (
    <></>
  );
};