import LikeButton from "./like-button";
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

  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <div style={container}>
        <Header title="ATB Multi-Factor Authentication (MFA) Account Search" />
      </div>

      <SearchBar />

      {/* Output list */}
      {/* <div style={container}>
        <ul>
          {/* iterate through an array creating an HTML List element for each index }
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <LikeButton />
      </div> */}
    </div>
  );
}