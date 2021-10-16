import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getResults } from "../../store/results";

import ResultCard from "./ResultCard";

import styles from "./Results.module.css"

function Result() {
    const dispatch = useDispatch();
    const userQuery = useSelector((state) => state.results);
    const { term } = useParams();
    const userArr = Object.values(userQuery);

    const filterArr = userArr.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
    )

    useEffect(() => {
        dispatch(getResults());
    }, [dispatch]);

    return (
        <>
            <ul className={styles.list}>
                {" "}
                <p className={styles.results_title
                }>Search Results:</p>
                {filterArr.map((user) => (
                    <li>
                        <ResultCard user={user} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Result;
