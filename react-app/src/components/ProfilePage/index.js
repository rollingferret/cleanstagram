import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ProfilePage() {
    const { userId } = useParams();


    return (
        <>
            <h1>Welcome {userId}</h1>
        </>
    )
}

export default ProfilePage;
