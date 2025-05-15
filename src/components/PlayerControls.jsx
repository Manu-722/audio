const PlayerControls = ({
  song,
  isPlaying,
  playNext,
  playPrev,
  togglePlayPause,
  shuffle,
  toggleShuffle,
}) => {
  return (
    <div className="player-controls">
      <h3>🎵 Now Playing: {song.trackName} — {song.artistName}</h3>
      <div className="controls">
        <button onClick={playPrev}>⏮ Prev</button>
        <button onClick={togglePlayPause}>{isPlaying ? "⏸ Pause" : "▶️ Play"}</button>
        <button onClick={playNext}>⏭ Next</button>
        <button onClick={toggleShuffle}>
          {shuffle ? "🔀 Shuffle: ON" : "🔁 Shuffle: OFF"}
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
