import React from 'react';

function App() {
  // capital-named constants are only used as aliases for “hard-coded” values
  const CLIENT_ID = '406c8a0b7edd439dae2018d8f93a2473';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  return (
    <div className="app">
      <header>
        <h1>Spotify React</h1>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
