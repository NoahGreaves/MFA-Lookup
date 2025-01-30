import SearchBar from "./search-bar";
import SearchButton from "./search-button";
import Header from "./header";

// TO TEST RUN ADMIN CMD PROMT AND USE COMMAND -- npm run dev --
// STARTS LOCAL SERVER TO TEST REACT APP

export default function HomePage() {
  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const containerColumn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  const inputFieldStyle = {
    // width: '50%',
    // height: '75px',
    padding: '12px 20px',
    boxSizing: 'border-box',
    border: '2px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
    fontSize: '16px',
    resize: 'none'
}

const buttonStyle = {
  marginTop: '5%'
}

  return (
    <div>
      <div style={containerColumn}>
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
        <SearchBar style={inputFieldStyle} />
        <SearchButton style={buttonStyle} />
      </div>
    </div>
  );
}