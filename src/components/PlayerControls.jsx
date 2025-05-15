const PlayerControls = ({ song }) => {
  return (
    <div className="player-controls">
      <audio controls src={song.previewUrl}></audio>
    </div>
  );
};

export default PlayerControls;