import React, { useState, useEffect } from "react";
import { SearchTypeDropDown } from "./searchTypeDropDown.js";

// import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";
import { GetSearch } from "../api/server/getSearch.js";

export const QueryResult = () => {
    const token = useAuthToken();
    const [dropdownOption, setDropdownOption] = useState("Name");

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handDropdownChange = (option) => {
        console.log("dropdown change: " + option); // Use the parameter directly
        setDropdownOption(option); // Update the state
    };

    const handleSearch = async () => {
        if (!search || !dropdownOption) {
            console.log("Please provide both a search method and a search term.");
            return; // Stop if inputs are invalid
        }

        const filters = {
            searchMethod: dropdownOption,
            search: String(search),
        };

        console.log("Filters before API call:", filters); // Debugging log

        try {
            const result = await GetSearch(filters, token);
            console.log("[Query Result] Fetched Search:", result.server_result); // Debugging log
            setResults(result.server_result); // Update results state
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    return (
        <div style={{ padding: "10px" }}>
            <h2>Search Clients</h2>
            <SearchTypeDropDown callback={handDropdownChange}></SearchTypeDropDown>

            <input
                type="text"
                placeholder={`Search for ${dropdownOption || "something"}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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