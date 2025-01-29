'use client'

import { useState } from 'react';

const accounts = ['Noah Greaves', 'Paul Martin', 'Kiley Carson'];

export default function SearchButton() {
    const container = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const buttonStyle = {
        marginTop: '5%'
    }
    
    const accountListContainer = document.getElementById('accountListContainer');
    const [numOfSearches, setNumOfSearches] = useState(0);

    function handleClick() {
        // Keep Track of Searches
        setNumOfSearches(numOfSearches + 1);
        if(numOfSearches > 0)
            accountListContainer.innerHTML = "";

        // Get Accounts
        if (!accountListContainer)
            return;

        // Create a list based on the amount of account matching search query
        let markup = `<div>`;
        markup += `<ul>`
        for (let i = 0; i < accounts.length; i++) {
            markup += `<li key=""${i}"">"${accounts[i]}"</li>`;
        }
        markup += `</ul>`;
        markup += `</div>`;

        console.log(markup);
        accountListContainer.innerHTML += markup;
    }

    return (
        <>
            <div id='accountListContainer'></div>
            <button style={buttonStyle} onClick={handleClick}>Search ({numOfSearches})</button>
        </>
    );
}