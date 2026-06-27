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
import ScrollToTop from './components/ScrollToTop';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <WatchProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes without Header and Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Header and Footer */}
            <Route path="/" element={
              <ProtectedRoute>
                <><Header /><Home /><Footer /></>
              </ProtectedRoute>
            } />
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
            <Route path="/explore" element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } />

            {/* Player Routes without Header */}
            <Route path="/watch/:seriesId" element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            } />
            <Route path="/watch/:seriesId/:episodeId" element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            } />
          </Routes>
          <BottomNav />
        </Router>
      </WatchProvider>
    </AuthProvider>
  );
}

export default App;

