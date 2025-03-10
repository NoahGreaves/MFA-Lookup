import oktaAuth from "../../oktaAuth";

export async function sendTokenToBackend(token) {
    try {

        // Store token in Okta's Token Manager
        oktaAuth.tokenManager.add("accessToken", { accessToken: token })

        const accessToken = await oktaAuth.tokenManager.get("accessToken")
        console.log(token)

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: "include", // Ensures the cookie is saved
            headers: {
                "Authorization": `Bearer` + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify( { accessToken: token })

            // body: `${JSON.stringify(oktaAuth.tokenManager.get("accessToken")
            //     .then((accessToken) => {
            //         console.log(accessToken)
            //     }))}`
        });

        if (!response.ok) {
            throw new Error("Failed to send token to backend");
        }

        console.log("Token successfully sent to backend!");
    } catch (error) {
        console.error("Error sending token to backend:", error.message);
    }
}
