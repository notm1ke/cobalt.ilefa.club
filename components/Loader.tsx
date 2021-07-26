import React from 'react';
import PageLoader from 'react-loader-spinner';
import styles from './styling/loader.module.css';

export const Loader = () => {
    return (
        <body className="bg-ilefa-dark">
            <div className={`loader-bg ${styles.loader}`}>
                <PageLoader type="TailSpin" color="#ffffff" height={60} width={60} />
            </div>
        </body>
    );
}