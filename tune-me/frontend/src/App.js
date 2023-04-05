import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [themes, setThemes] = useState([]);
  const [advanced, setAdvancedSearch] = useState({});
  
  const [songs, setSongs] = useState([]);
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleArtistChange = (event) =>{
    setArtist(event.target.value)
  }

  const handleYearChange = (event) =>{
    setYear(event.target.value)
  }

  const handleGenresChange = (event) =>{
    setGenres(event.target.value)
  }

  const handleThemesChange = (event) =>{
    setThemes(event.target.value)
  }

  const handleAdvancedChange = (event) =>{
    setAdvancedSearch(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('song', inputValue);
    bodyFormData.append('artist', artist)
    bodyFormData.append('year',year)
    bodyFormData.append('genres',genres)
    bodyFormData.append('themes',themes)
    bodyFormData.append('advanced',advanced)
    axios({
      method: "post",
      url: "http://localhost:5000/songs",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        setSongs(response.data)
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Recommender</h1>
      </header>
      <main>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="song">Enter song:</label>
          <input
            id="song"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />

          <label htmlFor="artist">Enter Artist:</label>
          <input
            id="artist"
            type="text"
            value={artist}
            onChange={handleArtistChange}
          />

          <label htmlFor="year">Enter year:</label>
          <input
            id="year"
            type="number"
            min="1900" 
            max="2099" 
            step="1"
            value={year}
            onChange={handleYearChange}
          />

          <label htmlFor="genres">Enter Genres:</label>
          <input
            id="genres"
            type="text"
            value={genres}
            onChange={handleThemesChange}
          />

          <label htmlFor="themes">Enter themes:</label>
          <input
            id="themes"
            type="text"
            value={themes}
            onChange={handleThemesChange}
          />
          <label htmlFor="advanced">Advanced Search Options:</label>
          <input
            id="advanced"
            type="text"
            value={advanced}
            onChange={handleAdvancedChange}
          />

          <button type="submit">Search</button>
        </form>
        <h2>Recommended Songs</h2>
        <ul>
          {songs.map(song => (
            <li>
                <div className="song-details">
                  <h3>{song}</h3>
                </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
