import React from 'react';
import PageLoader from 'react-loader-spinner';

export const Loader = () => {
    let style = {
        display: "flex",
        top: "45%",
        left: "49%",
        position: "fixed",
        backgroundColor: "#2C2C2C"
    };

    return (
        <body className="bg-ilefa-dark">
            <div className="loader-bg">
                <PageLoader type="TailSpin" color="#ffffff" height={60} width={60} style={style} />
            </div>
        </body>
    );
}