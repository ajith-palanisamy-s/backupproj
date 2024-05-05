import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';

const Trailer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const fetchTrailer = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailerKey = response.data.results[0]?.key;
      if (trailerKey) {
        window.open(`https://www.youtube.com/watch?v=${trailerKey}`);
      } else {
        console.log('No trailer available');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <div>
      
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
          
            <button onClick={() => fetchTrailer(movie.id)}>Watch Trailer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailer;
