import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PlayerControls from "./components/PlayerControls";
import FavoritesPage from "./components/FavoritesPage";
import PlaylistPage from "./components/PlayListPage";
import Login from "./components/Login";
import Signup from "./components/Register";

import "./index.css";

const categories = ["Afrobeats", "Country", "Reggae"];

const App = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      audioRef.current.src = songs[currentIndex].previewUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const searchMusic = async (term) => {
    if (!term.trim()) return;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
      setCurrentIndex(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSongs([]);
    }
  };

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

  const playSong = (index) => {
    setCurrentIndex(index);
  };

  const playNext = () => {
    if (songs.length === 0) return;

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentIndex(randomIndex);
    } else if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar query={query} setQuery={setQuery} searchMusic={() => searchMusic(query)} />

              <div className="categories-container">
                <h2>Song Categories</h2>
                <div className="categories-grid">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="category-card"
                      onClick={() => handleCategoryClick(cat)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleCategoryClick(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {songs.length > 0 && (
                <div className="search-results">
                  <h2>Search Results:</h2>
                  <div className="song-grid">
                    {songs.map((song, index) => (
                      <div key={song.trackId} className="card">
                        <img src={song.artworkUrl100} alt={song.trackName} className="song-image" />
                        <h3>{song.trackName}</h3>
                        <p>{song.artistName}</p>
                        <button onClick={() => playSong(index)} className="play-btn">Play</button>
                        <button onClick={() => addToFavorites(song)} className="favorite-btn">Add to Favorites</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <audio
                ref={audioRef}
                onEnded={playNext}
                style={{ display: "none" }}
              />

              {currentIndex !== null && songs[currentIndex] && (
                <PlayerControls
                  song={songs[currentIndex]}
                  isPlaying={isPlaying}
                  playNext={playNext}
                  playPrev={playPrev}
                  togglePlayPause={togglePlayPause}
                  shuffle={shuffle}
                  toggleShuffle={toggleShuffle}
                />
              )}
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
