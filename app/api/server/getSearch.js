//import useAuthToken from "../../hooks/useAuthToken.js";

export const GetSearch = async (filters, token) => {
    try {
        if (!filters || typeof filters !== "object") {
            throw new Error("❌ Invalid filters provided");
        }

        // Convert filter object to query string (e.g., { name: "John" } -> "?name=John")
        const queryParams = new URLSearchParams(filters).toString();
        const apiUrl = `http://localhost:3000/search?${queryParams}`;

        console.log("🚀 Constructed API URL:", apiUrl); 

        if (!apiUrl || apiUrl.includes("undefined") || apiUrl.includes("null")) {
            throw new Error("❌ Invalid API URL!");
        }

        const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        })

        if (!response.ok)
            throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        console.log("❤️ Fetched Result: ", data);
    
        return data; // Ensure it's an array
    } catch (error) {
        console.error("❌ Error fetching search results: ", error);
        return [];
    }
};
