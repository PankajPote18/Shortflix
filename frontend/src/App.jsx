import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Player from './pages/Player';
import { WatchProvider } from './context/WatchContext';
import './styles/global.css';

function App() {
  return (
    <WatchProvider>
      <Router>
        <Routes>
          {/* Routes with Header and Footer */}
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          
          {/* Player Routes without Header */}
          <Route path="/watch/:seriesId" element={<Player />} />
          <Route path="/watch/:seriesId/:episodeId" element={<Player />} />
        </Routes>
        <BottomNav />
      </Router>
    </WatchProvider>
  );
}

export default App;

