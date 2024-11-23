import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieApi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        alert('Error fetching movie details.');
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>No movie details found.</p>;

  return (
    <div className='container mx-auto p-4 flex flex-col items-center'>
      <img src={movie.Poster} alt={movie.Title} />
      <h2 className='font-bold text-2xl'>{movie.Title} ({movie.Year})</h2>
      <p><strong>Genre</strong> - {movie.Genre}</p>
      <p className='w-80 overflow-y-auto h-20'><strong>Cast</strong> - {movie.Plot}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Cast:</strong> {movie.Actors}</p>
    </div>
  );
};

export default MovieDetails;
