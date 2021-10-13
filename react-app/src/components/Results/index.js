import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getResults } from '../../store/results'

function Result() {
    const dispatch = useDispatch()
    const userQuery = useSelector((state) => state.results);
    const { term } = useParams()

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getResults(term));
    //     })();
    // }, [dispatch, term]);

    const userArr = Object.values(userQuery)

    const filteredArr = userArr.filter((user) => user.username.toLowerCase().includes(term.toLowerCase()))

    useEffect(() => {
        dispatch(getResults());
    }, [dispatch]);

    return (
        <>
            <h1>We've hit the results page!</h1>
            <ul> Search Results:
                {filteredArr.map((user) => (
                    <li>
                        <Link to={`/users/${user.id}`} key={user.id}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Result;
