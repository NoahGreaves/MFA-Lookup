import { useEffect, useState } from "react";

import { sendTokenToBackend } from "../api/utils/authService.js";
import oktaAuth from "../oktaAuth";

const useAuthToken = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            try {
                console.log("Fetching token from Okta...");

                const storedToken = await oktaAuth.tokenManager.get("accessToken");
                if (!storedToken) {
                    console.warn("No access token found in Okta token manager");
                } else {
                    console.log("Token retrieved:", storedToken);
                    setToken(storedToken.accessToken); // Store token

                    // Send token to backend
                    //await sendTokenToBackend(storedToken.accessToken);
                }


            } catch (error) {
                console.error("Error fetching token from Okta:", error);
            }
        };

        getToken();
    }, [token]);

    return token;
};

export default useAuthToken;