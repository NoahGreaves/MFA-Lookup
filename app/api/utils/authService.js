import oktaAuth from "../../oktaAuth";

export async function sendTokenToBackend(token) {
    try {

        // Store token in Okta's Token Manager
        oktaAuth.tokenManager.add("accessToken", { accessToken: token })

        const accessToken = await oktaAuth.tokenManager.get("accessToken")
        console.log("Sending to backend " + token)

        // const response = await fetch("http://localhost:3000/login", {
        const response = await fetch("http://localhost:3000/authorize", {
            method: "POST",
            // method: "GET",
            // credentials: "include", // Ensures the cookie is saved
            headers: {
                "Authorization": `Bearer ${token}`,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                // "Set-Cookie": ""
            },
            body: JSON.stringify({ accessToken: token })
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        console.log("Token successfully sent to backend! " + response.status);
    } catch (error) {
        console.error("Error sending token to backend: ", error.message);
    }
}
