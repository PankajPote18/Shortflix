import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Player from './pages/Player';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import MySpace from './pages/MySpace';
import { WatchProvider } from './context/WatchContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <WatchProvider>
        <Router>
          <Routes>
            {/* Public Routes with Header and Footer */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/login" element={<><Header /><Login /><Footer /></>} />
            <Route path="/register" element={<><Header /><Register /><Footer /></>} />

            {/* Protected Routes with Header and Footer */}
            <Route path="/settings" element={
              <ProtectedRoute>
                <><Header /><Settings /><Footer /></>
              </ProtectedRoute>
            } />
            <Route path="/my-space" element={
              <ProtectedRoute>
                <><Header /><MySpace /><Footer /></>
              </ProtectedRoute>
            } />

            {/* Explore Route (Full screen feed without Header) */}
            <Route path="/explore" element={<Explore />} />

            {/* Player Routes without Header */}
            <Route path="/watch/:seriesId" element={<Player />} />
            <Route path="/watch/:seriesId/:episodeId" element={<Player />} />
          </Routes>
          <BottomNav />
        </Router>
      </WatchProvider>
    </AuthProvider>
  );
}

export default App;

