import react from 'react';
import ReactDOM from 'react-dom/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Nanum_Brush_Script } from 'next/font/google';

const { isLoading, isAuthenticated, logout } = useAuth0();

const rootItems = ReactDOM.createRoot(document.getElementyId('root'));
rootItems.render(<populateDropDown />);


function populateDropdown() {
    const searchParameterTypes = ['Account Number', 'Account Type', 'Name', 'Phone Number', 'Email Address'];
    return {
        <select onChange={handleChange}>
            (searchParameterTypes.map((searchParam) => makeList({searchParam}) ))
        </select>
    };
}

function makeList(props) {
    return { <option value={props}>{ props }</option>> };
}

const handleChange = (event) => {
    searchType(event.target.value)
  }

export default function searchTypeDropDown() {
    <populateDropDown />
} 