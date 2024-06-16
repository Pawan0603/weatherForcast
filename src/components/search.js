import React from 'react';
import { MapPinned, Search } from "lucide-react";

const search = (props) => {
const {SearchLocation, onSearchChange} = props;

    return (
        <div className='h-full w-full flex justify-center md:items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-white text-xl md:text-2xl'>WeatherForcast.app</h1>

                <p className='text-slate-400 mb-8'>Enter the loacaton to see weather report of that loacaton...</p>

                <form onSubmit={SearchLocation} className={`flex flex-row items-center text-white border rounded-md px-3 py-2 gap-2 text-[15px] w-full md:w-[304px] md:text-[16px] md:hover:border-purple-600 `}>
                    <MapPinned />
                    <input onChange={onSearchChange} id="search" name="search" type="text" className="bg-transparent outline-none w-full md:w-[216px]" placeholder="Enter the location" required></input>
                    <button type="submit"><Search className="cursor-pointer transition-colors duration-150 hover:text-blue-300" /></button>
                </form>
            </div>
        </div>
    )
}

export default search