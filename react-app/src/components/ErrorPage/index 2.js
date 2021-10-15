import React from "react";
import { Link } from 'react-router-dom';

import style from './ErrorPage.module.css'

function ErrorPage() {
    return (
        <div className={style.errorContainer}>
            <p className={style.errorHeader}>Sorry, this page isn't available.</p>
            <p className={style.errorMessage}>
                The link you followed may be broken, or the page may have been removed.</p>
            <Link to='/'
                className={style.errorLink}
            >Click here to go back home.</Link>
        </div>
    )
};

export default ErrorPage;
