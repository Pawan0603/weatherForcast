import React from 'react';
import './cloudLoading.css';

const cloudLoading = () => {
    return (
        <div className='w-full h-screen md:h-[calc(100vh-28px)] absolute top-0 left-0 flex justify-center items-center backdrop:blur-md'>
            <div class="container">
                <div class="cloud front">
                    <span class="left-front"></span>
                    <span class="right-front"></span>
                </div>
                <span class="sun sunshine"></span>
                <span class="sun"></span>
                <div class="cloud back">
                    <span class="left-back"></span>
                    <span class="right-back"></span>
                </div>
            </div>
        </div>
    )
}

export default cloudLoading