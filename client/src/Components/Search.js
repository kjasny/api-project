import React from "react";
import "../css/Pages.css";

const Search = (props) => {
  const { search, setSearch } = props;

  return (
    <div className="searchInput">
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></input>
    </div>
  );
};

export default Search;
