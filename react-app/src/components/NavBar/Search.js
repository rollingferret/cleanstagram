import React, { useState} from 'react';
import { useHistory } from 'react-router-dom'

function Search() {
    const history = useHistory()

    const [search, setSearch] = useState('')

    const onSearch = (e) => {
        e.preventDefault();

        return history.push(`/results/${search}`)
    }

    return (
        <form onSubmit={onSearch}>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;
