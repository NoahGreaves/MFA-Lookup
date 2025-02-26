import react, { useState } from 'react';

export const SearchTypeDropDown = () => {
    const [searchType, setSearchType] = useState("Name");
    const searchParameterTypes = ['Account Number', 'Account Type', 'Name', 'Phone Number', 'Email Address'];

    const handleChange = (event) => {
        setSearchType(event.target.value)
    }

    let optionItems = searchParameterTypes.map((type) =>
        <option key={type}>{type}</option>
    );

    return (
        <div>
            <select onChange={handleChange}>
               {optionItems}
            </select>
        </div>
       )
}