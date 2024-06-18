import React from 'react';
import './cloudLoading.css';

const cloudLoading = () => {
    return (
        <div className='w-full h-screen md:h-[calc(100vh-28px)] absolute top-0 left-0 flex justify-center items-center backdrop:blur-md'>
            <div className="container">
                <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                </div>
                <span className="sun sunshine"></span>
                <span className="sun"></span>
                <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                </div>
            </div>
        </div>
    )
}

export default cloudLoading