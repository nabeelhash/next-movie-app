"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [des, setDes] = useState('')
  const [language, setLanguage] = useState('')
  const [release, setRelease] = useState('')
  const [popular, setPopular] = useState('')

  const [imageUrl, setImageUrl] = useState('')
  const [videoKey, setVideoKey] = useState('')
  const [videoName, setVideoName] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(function () {
    const details = localStorage.getItem('movieDetails')
    if (details) {
      const movieDetails = JSON.parse(details) // Parse the string to an object
      setTitle(movieDetails.title)
      setDes(movieDetails.overview)
      setLanguage(movieDetails.original_language)
      setRelease(movieDetails.release_date)
      setPopular(movieDetails.popularity)
      setImageUrl(movieDetails.poster_path)
      setLoading(false)

    }
    else{
      router.push('/')
    }
  })


  useEffect(function () {
    const fetchData = async function () {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`)
      const result = await response.json()
      const video = result.results
      if (video && video.length > 0) {
        console.log(video[0])
        setVideoKey(video[0].key)
        setVideoName(video[0].name)
      }
    }
    fetchData()
  }, [])

  console.log(videoKey, videoName)
  return (

    <div className='pt-[70px] bg-black min-h-screen text-gray-400'>
      {loading ? (
        <p className='px-5 text-xl text-white py-2'>Loading...</p>
      ) : (
        <>
          {show ? (
            <div>
              <h2>{videoName ? <p className='text-xl lg:text-2xl text-white text-center w-full my-3'>{videoName}</p> : "Movie Trailer"}</h2>
              <iframe
                className='w-[320px] h-[260px] sm:w-[460px] sm:h-[350px] md:h-[400px] md:w-[660px] lg:h-[500px] lg:w-[800px]  m-auto'
                src={`https://www.youtube.com/embed/${videoKey}`} // Embed the video using the key
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className='w-full flex flex-col items-center'>
                <button className='bg-white text-black px-4 py-1 mt-4' onClick={function () { setShow(false) }}>Go Back</button>

              </div>

            </div>
          )
            :
            (
              <div className='flex flex-wrap md:flex-nowrap w-[80%] gap-[50px] m-auto py-5'>
                <div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] '>
                  <img src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt="image" className='w-full h-full' />
                </div>
                <div className='w-[70%]'>
                  <p className='text-3xl font-bold text-white'>{title}</p>
                  <div className='flex gap-7 mt-3'>
                    <p>Language: {language}</p>
                    <p>Release: {release}</p>
                    <p>Popularity: {popular}</p>
                  </div>
                  <div className='mt-5'>
                    <p className='text-lg '>Overview</p>
                    <p className='text-md'>{des}</p>
                  </div>

                  <button className='bg-white text-black px-4 py-1 mt-4' onClick={function () { setShow(true) }}>Watch Trailer</button>
                </div>

              </div>
            )}
        </>
      )}

    </div>
  )
}

export default Page
