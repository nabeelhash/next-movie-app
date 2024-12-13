import React, { useContext, useState } from 'react'
import { SearchContext } from '../context/Search'

const Sidebar = () => {
    const categoryValues = ["Trending", "Upcoming", "Now Playing", "Top Rated"]

    const { category, setCategory } = useContext(SearchContext)
    return (
        <div className='mt-[20px] bg-black text-white px-4 py-2'>
            <div className='flex flex-col gap-3'>
                <p className='text-lg font-semibold'>NEW MOVIES</p>
                <div className="min-h-[6px] rounded w-[600px] bg-gradient-to-r from-red-600 to-transparent"></div>
                <div className='text-sm text-gray-300 flex gap-2 pl-3 '>
                    {categoryValues.map((val, index) => (
                        <div key={index} className=''>
                            <p className={`px-3 py-1 text-white cursor-pointer ${category === val ? " bg-red-600" : "bg-black"} `} onClick={function () { setCategory(val) }}>{val}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Sidebar
