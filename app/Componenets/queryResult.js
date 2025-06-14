import React, { useState, useEffect } from "react";
import { SearchTypeDropDown } from "./searchTypeDropDown.js";

import { GetSearch } from "../api/server/getSearch.js";
import { useAuth } from "../api/server/authContext.js";

export const QueryResult = () => {
    const [dropdownOption, setDropdownOption] = useState("Name");

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const { isAuthenticated } = useAuth();


    const handDropdownChange = (option) => {
        console.log("dropdown change: " + option); // Use the parameter directly
        setDropdownOption(option); // Update the state
    };

    const handleSearch = async () => {
        if (!search || !dropdownOption) {
            setResults("Please provide Search Term.");
            return null;
        }
        const filters = {
            searchMethod: dropdownOption,
            search: String(search),
        };

        try {
            const result = await GetSearch(filters);

            if (result.status === "Not Found") {
                setResults(result.message)
            }
            else if (result.status === "Error") {
                setResults(result.message)
            }
            else if (result.status === "Success") {
                setResults(result.data.server_result); // Update results state
            }
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        resultItem: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '1.5%',
        },
        name: {
            fontWeight: 'bold',
        },
        result: {
            marginLeft: '10px',
            color: '#555',
        },

    }

    return (
        <div>
            {isAuthenticated ? (
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
                            onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                    <div style={styles.result}>
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((result, index) => {
                                if (dropdownOption === "Name") {
                                    return (
                                        <div style={styles.resultItem} key={index}>
                                            <span style={styles.name}>{result.name}</span>
                                            <span style={styles.result}>{result.email}</span>
                                            <span style={styles.result}>{result.mfa}</span>
                                        </div>
                                    );
                                } else if (dropdownOption === "Email") {
                                    return (
                                        <div style={styles.resultItem} key={index}>
                                            <span style={styles.name}>{result.name}</span>
                                            <span style={styles.result}>{result.email}</span>
                                        </div>
                                    );
                                } else if (dropdownOption === "MFA") {
                                    return (
                                        <div style={styles.resultItem} key={index}>
                                            <span style={styles.result}>{result.name}</span>
                                            <span style={styles.result}>{result.mfa}</span>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div style={styles.resultItem} key={index}>
                                            <span style={styles.name}>{result.name}</span>
                                            <span style={styles.result}>{result.email}</span>
                                            <span style={styles.result}>{result.mfa}</span>
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <p>{results}</p>
                        )}
                    </div>
                </div>
            ) : (null)}
        </div>
    );
};