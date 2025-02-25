import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";


export const LogoutButton = () => {
  const { isLoading, isAuthenticated, logout } = useAuth0();
  const token = useAuthToken();
  const [error, setError] = useState(null);

  const mfaLookupLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Send cookies with the request
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

    } catch (err) {
      setError("Error Logging Out User: " + err.message);
    }
  }

  if (isLoading && isAuthenticated)
    return <div>Loading Logout...</div>

  if (isAuthenticated) return (
    <button onClick={mfaLookupLogout}>Log Out</button>
  );

  return (
    <></>
  );
};