import React, { useState } from 'react';

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  const [sortOption, setSortOption] = useState('');

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortOption === 'title') {
      return a.trackName.localeCompare(b.trackName);
    } else if (sortOption === 'artist') {
      return a.artistName.localeCompare(b.artistName);
    }
    return 0;
  });

  return (
    <div className="favorites-container">
      <h2>Favorites Page</h2>

      {favorites.length > 0 && (
        <div className="sort-container">
          <label>Sort by:</label>
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="">Default</option>
            <option value="title">Song Title</option>
            <option value="artist">Artist Name</option>
          </select>
        </div>
      )}

      {favorites.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className="favorites-grid">
          {sortedFavorites.map((song) => (
            <div key={song.trackId} className="card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              <audio controls>
                <source src={song.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(song.trackId)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
