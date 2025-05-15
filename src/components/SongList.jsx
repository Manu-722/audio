const SongList = ({ songs, onSelect, addToFavorites }) => {
  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.trackId} className="card">
          <img src={song.artworkUrl100} alt={song.trackName} />
          <h3>{song.trackName}</h3>
          <p>{song.artistName}</p>
          <button onClick={() => onSelect(song)}>▶️ Play</button>
          <button onClick={() => addToFavorites(song)}> Favorite</button>
        </div>
      ))}
    </div>
  );
};

export default SongList;