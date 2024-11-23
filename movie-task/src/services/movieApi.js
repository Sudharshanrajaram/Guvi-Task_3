import axios from 'axios';

const API_KEY = '58c58a31'; 
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchQuery, page = 1, type = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchQuery,
        page,
        type, // Filter by movie type (e.g., movie, series, episode)
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};
