import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio.jsx';
import SympliPage from './components/SympliPage.jsx';
import EffectiveTeamDynamics from './components/EffectiveTeamDynamics.jsx'
import FlightDelayedPrediction from './components/FlightDelayedPrediction.jsx'
import AtlantaFoodFinder from './components/AtlantaFoodFinder.jsx';
import EmailPhishingDetection from './components/EmailPhishingDetection.jsx'
import MediaProjectDemo from './components/ObjectModeling.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App"><Portfolio /></div>} />
        <Route path="/sympli" element={<div className="App"><SympliPage /></div>} />
        <Route path="/fdp" element={<div className="App"><FlightDelayedPrediction /></div>} />
        <Route path="/etd" element={<div className="App"><EffectiveTeamDynamics /></div>} />
        <Route path="/atlFoodFinder" element={<div className="App"><AtlantaFoodFinder /></div>} />
        <Route path="/EmailPhishingDetection" element={<div className="App"><EmailPhishingDetection /></div>} />
        <Route path="/MediaProjectDemo" element={<div className="App"><MediaProjectDemo /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;