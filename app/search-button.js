'use client'

import { useState } from 'react';

const accounts = [{ name: 'Noah Greaves', mfaMethod: 'Bio' }, {name: 'Prab Singh', mfaMethod: 'SMS'}, {name: 'Chris Beddoe', mfaMethod: 'Okra'},{ name: 'Paul Martin', mfaMethod: 'Token' }, { name: 'noor Abid', mfaMethod: 'OTP' }, { name: 'Kiley Carson', mfaMethod: 'None' }];

export default function SearchButton({ style }) {
    const [numOfSearches, setNumOfSearches] = useState(0);

    function handleClick() {
        // SANITIZE TEXT INPUT
        let keyword = "ab"; // GET KEYWORD FROM TEXTBOX 


        //******* Displays ONLY Array Elements That Have A Matching String With The Query  **********/
        const regexp = new RegExp(`(${keyword})`, "i")
        const filtered = accounts.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(regexp)));
        const accountListContainer = document.getElementById('accountListContainer');
        console.log(filtered);

        //******* Displays ALL Array Elements **********/
        // Keep Track of Searches
        setNumOfSearches(numOfSearches + 1);
        if (numOfSearches > 0)
            accountListContainer.innerHTML = " ";

        // Get Accounts
        if (!accountListContainer)
            return;

        // Create a list based on the amount of account matching search query
        let markup = `<div>`;
        markup += `<ul>`
        for (let i = 0; i < filtered.length; i++) {
            markup += `<li key="${i}"><strong>Account:</strong> ${filtered[i].name} <br> <strong>MFA Method:</strong> ${filtered[i].mfaMethod}</li>`;
            markup += `--------`;
        }
        markup += `</ul>`;
        markup += `</div>`;

        accountListContainer.innerHTML += markup;
    }

    return (
        <>
            <div id='accountListContainer'></div>
            <button style={style} onClick={handleClick}>Search ({numOfSearches})</button>
        </>
    );
}