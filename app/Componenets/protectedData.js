import React, { useState, useEffect } from "react";
import { useAuth } from "../api/server/authContext.js";


import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";
import oktaAuth from "../oktaAuth.js";

export const ProtectedData = () => {

    const { authenticated, user, loading } = useAuth();

    if (loading) return <p>Checking access...</p>;
    if (!authenticated) return <p>Access denied. Please log in.</p>;

    return (
        <div>
            <h2>Protected Content</h2>
            <p>Only visible to: {user.email}</p>
        </div>
    );

    // const token = useAuthToken();
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    // const { isAuthenticated } = useAuth0();


    // console.log(token)

    // useEffect(() => {

    //     const fetchData = async () => {
    //         if (!isAuthenticated)
    //             return;

    //         try {
    //             const response = await fetch("http://localhost:3000/time", {
    //                 // method: "POST",
    //                 method: "GET",
    //                 // credentials: "include", // Send cookies with the request
    //                 headers: {
    //                     // "Authorization": `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                     "Access-Control-Allow-Credentials": true,
    //                     // "Set-Cookie": `authToken=${token}`
    //                     // "Cookie": "authToken",
    //                 },
    //                 //body: JSON.stringify({ accessToken: token }),
    //             });


    //             if (!response.ok) {
    //                 throw new Error("Unauthorized");
    //             }

    //             const data = await response.json();
    //             setData(data);
    //             console.log("Protected data: ", data);
    //         } catch (err) {
    //             setError("Error Fetching Data: " + err.message);
    //         }
    //     };

    //     fetchData();
    // }, [isAuthenticated]);
    // // }, [isAuthenticated, token]);


    // // Helper function to format dates
    // const formatDate = (dateStr) => {
    //     return new Date(dateStr).toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //     });
    // };

    // // if (!token) return <p>Please Authenticate...</p>;
    // if (error) return <p>Error: {error}</p>;
    // if (!data) return;

    // return (
    //     <div>
    //         <pre>{formatDate(data.server_time.now)}</pre>
    //     </div>
    // );
};