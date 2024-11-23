import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
 
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img className='h-60 rounded-lg' src={movie.Poster} alt={movie.Title} />
      <h3 className='font-semibold mt-2 text-blue-500 text-center'>{movie.Title}</h3>
      <p>Onscreen - {movie.Year}</p>
      <p>{movie.Type}</p>
      <div className='mt-2 flex justify-between gap-4'>
      <Link to={`/movie/${movie.imdbID}`} className='bg-blue-500 text-white rounded-md mt-1 py-1 px-2 text-sm '>View Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;
