const SearchBar = ({ query, setQuery, searchMusic }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && searchMusic()}
        placeholder="Search for a song or artist..."
      />
      <button onClick={searchMusic}> Search</button>
    </div>
  );
};

export default SearchBar;