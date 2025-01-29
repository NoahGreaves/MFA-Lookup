'use client'

import SearchButton from "./search-button";

export default function SearchBar() {

    const containerColumn = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }

    // const searchBarStyle = {
    //     border: '2px solid black',
    //     margin: '1em',
    //     width: '50%',
    //     height: '2em'
    // }

    const inputFieldStyle = {
        width: '50%',
        height: '75px',
        padding: '12px 20px',
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        fontSize: '16px',
        resize: 'none'
    }

    const buttonStyle = {
        // marginTop: '10%'
    }

    return (
        <div>
            <div style={containerColumn}>
                <textarea style={inputFieldStyle} id="searchField" placeholder="Search..."></textarea>
                <SearchButton />
            </div>
        </div>
    )
}