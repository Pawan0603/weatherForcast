import React from 'react'
import './loading.css';

const loading = () => {
    return (
        <div className='w-full h-screen md:h-[calc(100vh-28px)] absolute top-0 left-0 flex justify-center items-center'>
            <div className="spinner">
                <div className="outer">
                    <div className="inner tl"></div>
                    <div className="inner tr"></div>
                    <div className="inner br"></div>
                    <div className="inner bl"></div>
                </div>
            </div>
        </div>
    )
}

export default loading