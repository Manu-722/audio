import { useState } from "react";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const addToPlaylist = (song) => {
    if (!playlist.find((track) => track.trackId === song.trackId)) {
      setPlaylist([...playlist, song]);
    }
  };

  return (
    <div className="playlist-container">
      <h2>Playlist Page</h2>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
      />
      <h3>{playlistName || "My Playlist"}</h3>
      <div className="playlist-grid">
        {playlist.length === 0 ? <p>No songs in playlist yet.</p> :
          playlist.map((song) => (
            <div key={song.trackId} className="card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              <audio controls>
                <source src={song.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PlaylistPage;