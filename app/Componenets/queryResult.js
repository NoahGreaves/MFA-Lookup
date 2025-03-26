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

        try {
            const result = await GetSearch(filters, token);
            console.log("[Query Result] Fetched Search:", result.server_result); // Debugging log
            setResults(result.server_result); // Update results state
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        searchBar: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        input: {
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px 0 0 5px',
            fontSize: '1rem',
        },
        button: {
            backgroundColor: '#0072f0',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '0 5px 5px 0',
            fontSize: '1rem',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#005bb5',
        },
        result: {
            padding: '10px',
            backgroundColor: '#f4f4f9',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            color: '#333',
        },

    }

    return (
        <div style={styles.container}>
            <h2>Search Clients</h2>

            <div style={styles.searchBar}>
                <SearchTypeDropDown callback={handDropdownChange}></SearchTypeDropDown>

                <input
                    style={styles.input}
                    type="text"
                    placeholder={`Search for ${dropdownOption || "something"}`}
                    value={search}

                    onChange={(e) => setSearch(e.target.value)}
                />


                <button
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#005bb5')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#0072f0')}
                    onClick={handleSearch}>Search</button>
            </div>

            <div style={styles.result}>
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