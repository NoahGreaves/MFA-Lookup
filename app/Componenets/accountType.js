'use client'

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Data from '../data/data.json';

//const accounts = ["ATB Personal", "ATB Business", "Digital Application", "ATB Prosper", "Investor Connect"];

// if reading JSON from a string use JSON.parse('JSON_STRING')
//for (var i = 0; i < Data.accounts.length; i++) {
//    accounts[i] = Data.accounts[i];
//}

export default function accountTypeSelect({ style }) {
    const { isLoading, isAuthenticated } = useAuth0();
    const [inputValue, setInputValue] = useState("");
    
   
    if (isLoading)
        return <div>Loading...</div>

    if (!isAuthenticated)
        return <div>Please Login</div>

    let numOfSearches = 0;

    const handleChange = (event) => {
       
        const accountListContainer = document.getElementById('accountListContainer');
        
        //******* Displays ONLY Array Elements That Have A Matching String With The Query  **********/
        const regexp = atbAccountType.value;
        const filtered = accounts.filter(entry => Object.values(entry).some(val.match(regexp)));

        //******* Displays ALL Array Elements **********/
        // Keep Track of Searches
        numOfSearches++;
        if (numOfSearches > 0)
            accountListContainer.innerHTML = " ";

        // Get Accounts
        if (!accountListContainer)
            return;

        // Create a list based on the amount of account matching search query
        let markup = `<div>`;
        markup += `<ul>`
        for (let i = 0; i < filtered.length; i++) {
            markup += `<li key="${i}"><strong>Name:</strong> ${filtered[i].name} <br> 
            <strong>Email:</strong> ${filtered[i].email} <br> 
            <strong>Phone #:</strong> ${filtered[i].phoneNumber} <br> 
            <strong>MFA Method:</strong> ${filtered[i].mfaMethod}</li>`;
            markup += `--------`;
        }

        markup += `</ul>`;
        markup += `</div>`;

        accountListContainer.innerHTML += markup;
    };

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        //fetch('/some-api', { method: form.method, body: formData });
        // You can generate a URL out of it, as the browser does by default:
        //console.log(new URLSearchParams(formData).toString());
        // You can work with it as a plain object.
        const selectedAccountType = Object.fromEntries(formData.entries());
    }
    
    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Please Select Account Type:
                <br>&nbsp;</br>
                <select name="atbAccountType" multiple={false}>
                    <option value="1">ATB Personal</option>
                    <option value="2">ATB Business</option>
                    <option value="3">Digital Application</option>
                    <option value="4">ATB Prosper</option>
                    <option value="5">Investor Relations</option>
                </select>
            </label>
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
        </form>
        
    );
}