import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // capital-named constants are only used as aliases for “hard-coded” values
  const CLIENT_ID = "406c8a0b7edd439dae2018d8f93a2473";
  const REDIRECT_URI =
    process.env.REACT_APP_CLIENT_URL || "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token); // key: value
    }

    setToken(token);
  }, []);

  console.log(REDIRECT_URI);

  /* removes token from browsers local storage */
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (event) => {
    event.preventDefault();

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div className="artist-card" key={artist.id}>
        <h3>{artist.name}</h3>
        {artist.images.length ? (
          <img src={artist.images[0].url} alt={artist.name} />
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };

  return (
    <>
      <header className="app-header">
        <h1>Spotify React</h1>
        {!token ? (
          <button id="login-btn">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          </button>
        ) : (
          <button id="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
        {token ? (
          <form onSubmit={searchArtists}>
            <input
              type="text"
              onChange={(event) => setSearchKey(event.target.value)}
            />
            <button type={"submit"} id="search-btn">
              Search
            </button>
          </form>
        ) : (
          <h2>Please login!</h2>
        )}
      </header>

      <div className="artist-container">
        <div className="artist-grid">{token && artists && renderArtists()}</div>
      </div>
    </>
  );
}

export default App;
