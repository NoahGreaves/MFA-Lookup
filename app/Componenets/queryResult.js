import React, { useState, useEffect } from "react";
// import { SearchTypeDropDown } from "./Componenets/searchTypeDropDown.js";
import { SearchTypeDropDown } from "./searchTypeDropDown.js";

import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";
import { GetSearch } from "../api/server/getSearch.js";

export const QueryResult = () => {
    const token = useAuthToken();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth0();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const filters = {
            name: '',
            email: '',
        };
        if (name) filters.name = String(name);
        if (email) filters.email = String(email);

        console.log("Filters before API call:", filters); // Debug filters

        await GetSearch(filters, token)
        .then((result) => {
            console.log("📦 Fetched Search:", result.server_result) // Debugging log
            setResults(result.server_result) // Update state with API data
        });
    };

    if (!token) return <p>Please Authenticate...</p>;
    if (error) return <p>Error: {error}</p>;

    return isAuthenticated && (
        <div style={{ padding: "10px" }}>
            <h2>Search Clients</h2>
          <SearchTypeDropDown></SearchTypeDropDown>
          <input
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>

            <div>
                {Array.isArray(results) && results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.email}>
                            {result.name} - {result.email} - {result.mfa}
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};