"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { SearchContext } from "./context/Search";
import heros from './assets/heros.jpg'
import heros1 from './assets/heros1.jpg'

export default function Home() {
  const [movie, setMovies] = useState([])
  const { search, setSearch } = useContext(SearchContext)
  const { category, setCategory } = useContext(SearchContext)

  // const [filterMovie, setFilterMovie] = useState([])
  const [page, setPage] = useState(1); // To track the current page
  const [totalPages, setTotalPages] = useState(1); // To trac
  const [isSlidDown, setIsSlidDown] = useState(false);


  useEffect(function () {
    const fetchData = async function () {
      try {
        let url = '';
        if (search) {
          // Fetch movies based on the search query
          url = `https://api.themoviedb.org/3/search/movie?api_key=2c232c63497b39daf1397f84e07468fd&query=${search}&page=${page}`;
        } else {
          switch (category) {
            case 'Trending':
              url = `https://api.themoviedb.org/3/trending/movie/day?api_key=2c232c63497b39daf1397f84e07468fd&page=${page}`;
              break;
            case 'Top Rated':
              url = `https://api.themoviedb.org/3/movie/top_rated?api_key=2c232c63497b39daf1397f84e07468fd&page=${page}`;
              break;
            case 'Latest':
              url = `https://api.themoviedb.org/3/movie/latest?api_key=2c232c63497b39daf1397f84e07468fd&page=${page}`;
              break;
            case 'Upcoming':
              url = `https://api.themoviedb.org/3/movie/upcoming?api_key=2c232c63497b39daf1397f84e07468fd&page=${page}`;
              break;
            case 'Now Playing':
              url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
              break;
            default:
              return;
          }
        }

        const response = await fetch(url);
        const result = await response.json()
        console.log(result.results)
        setMovies(result.results)
        setTotalPages(result.total_pages); // Set the total pages from the API response
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [category, page, search])


  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex flex-col">
        <div className={`w-full h-[730px] mt-[35px] relative bg-cover bg-bottom`}>
          <Image alt="hero" className="w-full h-full object-cover " src={heros} />
          {/* Optional overlay if needed */}
          <div className="absolute top-0 left-0 w-full h-full inset-0 bg-black bg-opacity-20 z-2"></div>
        </div>
        <Sidebar />

        <div className='flex gap-3  flex-wrap w-full justify-center pt-[30px]'>
          {movie.length > 0 ? (
            movie.map((movie, index) => (
              <div className='relative  rounded-[10px] transition-transform duration-300 hover:scale-105' key={index}>
                {/* <div className='w-[250px] h-[300px] opacity-[20%] bg-gray-600 z-5 absolute'>
            </div> */}
                <div className='w-[220px] h-[210px] '>
                  <Link href={`details/${movie.id}`} onClick={() => {
                    // Store additional data in localStorage
                    localStorage.setItem('movieDetails', JSON.stringify(movie));
                  }}><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='w-full h-full object-top object-cover  rounded-t-[10px]' alt="" /></Link>
                </div>
                <div className='py-4 text-white px-3'>
                  <p className='text-2xl font-bold'>Movie Name</p>
                  <div className='flex gap-4'>
                    <p>Release Date</p>
                    <p className='text-md '>{movie.release_date}</p>

                  </div>

                </div>
              </div>
            )))
            : (
              <p className="text-white">No Movie Found</p>
            )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-5 gap-5 py-5">
        {/* Previous Button */}
        <button
          className="text-black bg-white px-4 py-2 border rounded"
          disabled={page === 1} // Disable if on the first page
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {/* Current Page Indicator */}
        <span className="text-white">
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          className="text-black bg-white px-4 py-2 border rounded"
          disabled={page === totalPages} // Disable if on the last page
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
