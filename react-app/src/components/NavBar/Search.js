import React, { useState} from 'react';
import { useHistory } from 'react-router-dom'

import styles from "./NavBar.module.css";

function Search() {
    const history = useHistory()

    const [search, setSearch] = useState('')

    const handleKeyDown = (e) => {
        // e.preventDefault();

        if (e.key === 'Enter') {
            console.log('do validate')
            return history.push(`/results/${search}`)
        }
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value) }
                onKeyDown={handleKeyDown}
                className={styles.search_bar}
            />
            {/* <button type="submit">Search</button> */}
        </form>
    )
}

export default Search;
