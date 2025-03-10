import react, { useState } from 'react';

export const SearchTypeDropDown = ({ callback }) => {
    const [searchMethod, setSearchMethod] = useState("Name");
    // const searchParameterTypes = ['Account_Number', 'Name', 'MFA_Method', 'Phone_Number', 'Email_Address'];
    const searchParameterTypes = ['Name', 'MFA', 'Email_Address'];

    const handleChange = () => {
        // setSearchType(event.target.value)
        callback(searchMethod);
        console.log(searchMethod);
        
    }

    let optionItems = searchParameterTypes.map((type) =>
        <option key={type}>{type.split('_').join(' ')}</option>
    );
    // onChange={(e) => setData(e.target.value)
    return (
        <div>
            Search by:
            <select onChange={(event) => {
                setSearchMethod(event.target.value);
                handleChange();
            }}>
                {optionItems}
            </select>
        </div>
    )
}