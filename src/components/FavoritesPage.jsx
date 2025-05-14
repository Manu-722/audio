const FavoritesPage = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favorites Page</h2>
      {favorites.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((song) => (
            <div key={song.trackId} className="card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              <audio controls>
                <source src={song.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;