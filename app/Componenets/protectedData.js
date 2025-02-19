import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";

export const ProtectedData = () => {
    const token = useAuthToken();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth0();

    useEffect(() => {

        const fetchData = async () => {
            console.log(isAuthenticated);
            if(!isAuthenticated)
                return;

            try {
                const response = await fetch("http://localhost:3000/time", {
                    method: "GET",
                    credentials: "include", // Send cookies with the request
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials" : true,
                    },
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await response.json();
                setData(data);
                console.log("Protected data:", data);
            } catch (err) {
                setError("Error Fetching Data: " + err.message);
            }
        };

        fetchData();
    }, [isAuthenticated, token]);

    if (!token) return <p>Loading token...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading data...</p>;

    return (
        <div>
            <h2>Protected Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};