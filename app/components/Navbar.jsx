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
        <Link href={'/'}><div className='text-xl flex items-center gap-2'>
          <Image src={Logo} width={40} height={40} alt='logo'/>
          Movieverse
          </div></Link>
        <div className='flex gap-5'>
        <input type="text" placeholder='search movies' onChange={function(e){setSearch(e.target.value)}} className='w-[150px] text-sm bg-gray-800 px-3 py-1' />
        </div>


    </div>
  )
}

export default Navbar
