import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieApi';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import img1 from '../assets/images/1photo.png';
import img2 from '../assets/images/2photo.jpg';
import img3 from '../assets/images/3photo.jpg';
import img4 from '../assets/images/4photo.jpg';
import img5 from '../assets/images/5photo.jpg';
import img6 from '../assets/images/6photo.jpg';
import img7 from '../assets/images/7photo.jpg';


const MovieList = ( {toggleFav} ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState('');

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(searchQuery, currentPage, selectedType);
      setMovies(data.Search || []);
      setTotalPages(Math.ceil(data.totalResults / 10)); // Assuming 10 results per page
    } catch (error) {
      alert('Error fetching movies.');
    }
    setLoading(false);
  };
 

  useEffect(() => {
    if (searchQuery) {
      fetchMovieData();
    }
  }, [searchQuery, currentPage, selectedType]);

  return (
    <div className=' mx-auto bg-gray-200'>
      <div className='flex justify-between items-center mb-4 bg-blue-500 text-white md:p-6 p-3 rounded-lg shadow-md'>
      <h1 className='text-xl md:text-3xl font-bold '>Movie Hunt</h1>
      <div className='flex space-x-2 md:space-x-4 text-black'>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterDropdown selectedType={selectedType} onTypeChange={setSelectedType} />
      </div>
      </div>
      {loading ? <p>Loading...</p> : null}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (<div className='xl:ml-44 grid col-span-1 md:col-span-3 mt-4 '>
          <h1 className='text-4xl ml-5 md:text-6xl xxl:text-7xl  font-bold mb-3 text-blue-600'>Browse new, popular and upcoming top 3 movies.</h1>
          <div className='md:flex md:space-x-60 ml-20 md:ml-56 mt-5'>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>1</h1>
            <img src={img1} alt="img1" className='absolute ml-10  w-40 h-60 rounded-lg' />
          </div>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>2</h1>
            <img src={img2} alt="img2" className='absolute ml-12  w-40 h-60 rounded-lg' />
          </div>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>3</h1>
            <img src={img3} alt="img3" className='absolute ml-12  w-40 h-60 rounded-lg' />
          </div>
          </div>
          <h1 className='text-4xl ml-5 md:text-6xl xl:text-7xl  font-bold mb-3 mt-5 text-blue-600'>New upcoming top 3 TV Shows.</h1>
          <div className='md:flex md:space-x-60 ml-20 md:ml-56 mt-5'>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>1</h1>
            <img src={img4} alt="img1" className='absolute ml-10  w-40 h-60 rounded-lg' />
          </div>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>2</h1>
            <img src={img5} alt="img2" className='absolute ml-12  w-40 h-60 rounded-lg' />
          </div>
          <div className='flex mb-4'>
            <h1 className='h-60 text-8xl text-gray-400 pt-32 font-bold'>3</h1>
            <img src={img6} alt="img3" className='absolute ml-12  w-40 h-60 rounded-lg' />
          </div>
          </div>
          <div className='flex justify-center mt-10 items-center '>
            <img src={img7} alt="img7" className='md:ml-60 xl:ml-20 rounded-lg opacity-10' />
            <div className='absolute flex space-x-5 '>
            <img src={img1} alt="img1" className='h-32 w-20 md:w-40 md:h-60  rounded-lg' />
            <div className=''>
            <h3 className='text-lg md:text-xl font-bold'>Batman</h3>
            <p><strong>IMDB</strong> : 8.8 rating</p>
            <p className='text-xs md:text-sm xl:text-xl font-semibold'><strong>Cast  </strong> - When a sadistic serial <br /> killer begins murdering key <br /> political figures in Gotham,<br /> The Batman is forced to <br /> investigate the city's hidden <br /> corruption and question his <br /> family's involvement. </p>
            </div>
            </div>
          </div>
          <p>No results found.</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MovieList;
