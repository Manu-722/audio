const SongList = ({ songs, onSelect, addToFavorites }) => {
  console.log("Rendering Songs:", songs); // ✅ Debugging log

  return (
    <div className="song-grid">
      {songs.length === 0 ? (
        <p>No songs found. Try another search!</p> 
      ) : (
        songs.map((song) => (
          <div key={song.trackId} className="card">
            <img src={song.artworkUrl100} alt={song.trackName} />
            <h3>{song.trackName}</h3>
            <p>{song.artistName}</p>
            <audio controls>
              <source src={song.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => onSelect(song)}>▶️ Play</button>
            <button onClick={() => addToFavorites(song)}>❤️ Favorite</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SongList;