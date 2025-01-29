import SearchBar from "./search-bar";
import Header from "./header";

// TO TEST RUN ADMIN CMD PROMT AND USE COMMAND -- npm run dev --
// STARTS LOCAL SERVER TO TEST REACT APP

export default function HomePage() {
  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div>
      <div style={container}>
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
      </div>

      <SearchBar />


    </div>
  );
}