import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
    const username = 'StudentUser';

    return(
        <div Classname="dashboard">
            <h1>Welcome {username}!</h1>
        </div>
    )
}

export default DashboardPage;