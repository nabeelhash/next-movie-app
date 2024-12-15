"use client"
import Link from 'next/link';
import React, { useContext } from 'react'
import { SearchContext } from '../context/Search'
import Logo from '../assets/logo.png'
import Image from 'next/image';

const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <div className='bg-black fixed w-full z-10 flex items-center justify-between text-white py-4 px-10'>
      <Link href={'/'}><div className='text-xl flex items-center gap-[3px] md:gap-2'>
        <Image src={Logo} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" alt='logo' />
        Movieverse
      </div></Link>
      <div className='flex gap-5'>
        <input type="text" placeholder='search movies' onChange={function (e) { setSearch(e.target.value) }} className='w-[150px] text-sm bg-gray-800 px-3 py-1' />
      </div>


    </div>
  )
}

export default Navbar
