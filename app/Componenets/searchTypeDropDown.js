import react, { useState } from 'react';

export const SearchTypeDropDown = () => {
    const [searchType, setSearchType] = useState("Name");
    const searchParameterTypes = ['Account_Number', 'Account_Type', 'Name', 'Phone_Number', 'Email_Address'];

    const handleChange = (event) => {
        setSearchType(event.target.value)
    }

    let optionItems = searchParameterTypes.map((type) =>
        <option key={type}>{ type.split('_').join(' ') }</option>
    );

    return (
        <div>
            Search by: 
            <select onChange={handleChange}>
                {optionItems}
            </select>
        </div>
    )
}