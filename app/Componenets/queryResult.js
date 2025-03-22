import React, { useState, useEffect } from "react";
import { SearchTypeDropDown } from "./searchTypeDropDown.js";

import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken.js";
import { GetSearch } from "../api/server/getSearch.js";

export const QueryResult = () => {
    const token = useAuthToken();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth0();

    const [dropdownOption, setDropdownOption] = useState("");

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handDropdownChange = (option) => {
        setDropdownOption(option);
        console.log("dropdown change: " + dropdownOption);
    }

    const handleSearch = async () => {
        const filters = {
            searchMethod: '',
            search: '',
        };

        if (search) filters.search = String(search);
        filters.searchMethod = String(dropdownOption);
        console.log("searchMethod: ", filters.searchMethod) // Debugging log

        console.log("Filters before API call:", filters); // Debug filters

        await GetSearch(filters, token)
        .then((result) => {
            console.log("[Query Result] Fetched Search:", result.server_result) // Debugging log
            setResults(result.server_result) // Update state with API data
        });
    };

    return (
        <div style={{ padding: "10px" }}>
            <h2>Search Clients</h2>
            <SearchTypeDropDown callback={handDropdownChange}></SearchTypeDropDown>
           
           <input
                type="text"
                placeholder={`Search for ${dropdownOption}`}
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