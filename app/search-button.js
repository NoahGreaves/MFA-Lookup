'use client'

import { useState } from 'react';

// const accounts = [{ name: 'Noah Greaves', mfaMethod: 'Bio' }, {name: 'Prab Singh', mfaMethod: 'SMS'}, {name: 'Chris Beddoe', mfaMethod: 'Okra'},{ name: 'Paul Martin', mfaMethod: 'Token' }, { name: 'noor Abid', mfaMethod: 'OTP' }, { name: 'Kiley Carson', mfaMethod: 'None' }];

export default function SearchButton({ style }) {
    const [numOfSearches, setNumOfSearches] = useState(0);

    function handleClick() {

    }

    return (
        <>
            <button style={style} onClick={handleClick}>Search ({numOfSearches})</button>
        </>
    );
}