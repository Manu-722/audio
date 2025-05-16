import React from "react";

const PlaylistPage = ({ playlist, setPlaylist, playlistName, setPlaylistName }) => {
  const removeFromPlaylist = (trackId) => {
    setPlaylist(playlist.filter((song) => song.trackId !== trackId));
  };

  return (
    <div className="playlist-container">
      <h2>Playlist Page</h2>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
        className="playlist-input"
      />
      <h3>{playlistName || "My Playlist"}</h3>
      <div className="playlist-grid">
        {playlist.length === 0 ? (
          <p>No songs in playlist yet.</p>
        ) : (
          playlist.map((song) => (
            <div key={song.trackId} className="card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              <audio controls>
                <source src={song.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button onClick={() => removeFromPlaylist(song.trackId)} className="remove-btn">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
