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

  // Song categories
  const categories = [
    "Afrobeats",
    "Hip Hop",
    "Pop",
    "Rock",
    "Jazz",
    "Classical",
    "Country",
    "Electronic",
  ];

  // Load user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Sync favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search function accepts optional term parameter (category click or search bar)
  const searchMusic = async (searchTerm) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    if (!term.trim()) return;

    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20`;
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSongs([]);
    }
  };

  // When user clicks category card
  const handleCategoryClick = (category) => {
    setQuery(category);
    searchMusic(category);
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
                searchMusic={() => searchMusic()}
              />

              {/* Categories Section */}
              <div className="categories-section">
                <h2>Song Categories</h2>
                <div className="categories-grid">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="category-card"
                      onClick={() => handleCategoryClick(category)}
                      tabIndex={0} // for keyboard accessibility
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCategoryClick(category);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Results */}
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
        <Route path="/playlist" element={user ? <PlaylistPage /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
