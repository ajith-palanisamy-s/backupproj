// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Filter.css';
import Cards from '../Card/Card';
import { useEffect, useState } from 'react';

function Filterr() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = 'https://api.themoviedb.org/3/discover/movie';
        url += `?api_key=4e44d9029b1270a757cddc766a1bcb63`;

        if (selectedGenre) url += `&with_genres=${selectedGenre}`;
        if (selectedYear) url += `&primary_release_year=${selectedYear}`;
        if (selectedLanguage) url += `&with_original_language=${selectedLanguage}`;
        if (selectedRating) url += `&vote_average.gte=${selectedRating}`;
        url += `&sort_by=${sortBy}&page=${page}`;

        const response = await axios.get(url);
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedYear, selectedLanguage, selectedRating, sortBy, page]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterMovies(searchTerm, selectedGenre, selectedYear, selectedLanguage, selectedRating);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    setPage(1); // Reset page to 1 when genre changes
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    setPage(1); // Reset page to 1 when year changes
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setPage(1); // Reset page to 1 when language changes
  };

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setSelectedRating(rating);
    setPage(1); // Reset page to 1 when rating changes
  };

  
  const handleSortByChange = (event) => {
    const sortByValue = event.target.value;
    setSortBy(sortByValue);
    setPage(1); // Reset page to 1 when sorting changes
  };

  const filterMovies = (searchTerm, genre, year, language, rating, releaseDate) => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Movie Filter</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="878">Science Fiction</option>
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">All Years</option>
        {Array.from({ length: 50 }, (v, i) => 2025 - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">All Languages</option>
        <option value="en">English</option>
        <option value="ta">Tamil</option>
        <option value="ml">Malayalam</option>
        <option value="kn">Kannada</option>
        <option value="te">Telugu</option>
        <option value="hi">Hindi</option>
      </select>

      <select value={selectedRating} onChange={handleRatingChange}>
        <option value="">All Ratings</option>
        {Array.from({ length: 9 }, (v, i) => i + 1).map((rating) => (
          <option key={rating} value={rating}>
            {rating}+
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={handleSortByChange}>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="release_date.desc">Release Date Descending</option>
        <option value="release_date.asc">Release Date Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="primary_release_date.desc">Primary Release Date Descending</option>
        <option value="primary_release_date.asc">Primary Release Date Ascending</option>
        <option value="original_title.asc">Title (A-Z)</option>
        <option value="original_title.desc">Title (Z-A)</option>
      </select>

      <div className='filtercard'>
        
      <div className='pagination button'>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
        <ul>
          {filteredMovies.map(movie => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </ul>
    

      <div className='pagination button'>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default Filterr;
