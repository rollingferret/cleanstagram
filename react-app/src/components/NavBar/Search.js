import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./NavBar.module.css";

function Search() {
  const history = useHistory();

  const [search, setSearch] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        return history.push(`/results/${search}`);
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.search_bar}
      />
    </form>
  );
}

export default Search;
