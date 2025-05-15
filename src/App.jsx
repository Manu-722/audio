import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import PlayerControls from "./components/PlayerControls";
import FavoritesPage from "./components/FavoritesPage";
import PlaylistPage from "./components/PlaylistPage";
import Login from "./components/Login";
import Signup from "./components/Register";

import "./index.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const searchMusic = async () => {
    if (!query.trim()) return;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&limit=20`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSongs([]);
    }
  };

  const addToFavorites = (song) => {
    if (user) {
      if (!favorites.find((fav) => fav.trackId === song.trackId)) {
        setFavorites([...favorites, song]);
      }
    } else {
      alert("Please log in to add songs to favorites.");
    }
  };

  const removeFromFavorites = (trackId) => {
    setFavorites((prev) => prev.filter((song) => song.trackId !== trackId));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar
                query={query}
                setQuery={setQuery}
                searchMusic={searchMusic}
              />
              {songs.length > 0 && (
                <div className="search-results">
                  <h2>Search Results:</h2>
                  <div className="song-grid">
                    {songs.map((song) => (
                      <div key={song.trackId} className="card">
                        <img
                          src={song.artworkUrl100}
                          alt={song.trackName}
                          className="song-image"
                        />
                        <h3>{song.trackName}</h3>
                        <p>{song.artistName}</p>
                        <button
                          onClick={() => setCurrentSong(song)}
                          className="play-btn"
                        >
                          Play Song
                        </button>
                        <button
                          onClick={() => addToFavorites(song)}
                          className="favorite-btn"
                        >
                          Add to Favorites
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentSong && <PlayerControls song={currentSong} />}
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            user ? (
              <FavoritesPage
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/playlist"
          element={user ? <PlaylistPage /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
