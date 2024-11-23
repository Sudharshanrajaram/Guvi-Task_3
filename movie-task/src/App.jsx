import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';


const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<MovieList />} />
      </Routes>
    </Router>
  );
};

export default App;
  