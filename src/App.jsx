import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import PlayerControls from "./components/PlayerControls";
import FavoritesPage from "./components/FavoritesPage"; // New Favorites Page
import PlaylistPage from "./components/PlaylistPage"; // Playlist Page
import "./index.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const searchMusic = async () => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=20`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToFavorites = (song) => {
    if (!favorites.find((fav) => fav.trackId === song.trackId)) {
      setFavorites([...favorites, song]);
    }
  };

  return (
    <Router>
      <Navbar />
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/playlist">Playlist</Link>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchBar query={query} setQuery={setQuery} searchMusic={searchMusic} />
              <h2>Search Results</h2>
              <SongList songs={songs} onSelect={setCurrentSong} addToFavorites={addToFavorites} />
              {currentSong && <PlayerControls song={currentSong} />}
            </>
          }
        />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </Router>
  );
};

export default App;