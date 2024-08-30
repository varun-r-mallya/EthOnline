import React from 'react';
import { NextPage } from 'next';

const Error404Page: NextPage = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
        </div>
    );
};

export default Error404Page;