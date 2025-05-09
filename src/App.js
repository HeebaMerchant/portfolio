import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio.jsx';
import SympliPage from './components/SympliPage.jsx';
import FlightDelayedPrediction from './components/FlightDelayedPrediction.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App"><Portfolio /></div>} />
        <Route path="/sympli" element={<div className="App"><SympliPage /></div>} />
        <Route path="/fdp" element={<div className="App"><FlightDelayedPrediction /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;