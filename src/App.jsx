import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdSense from './components/AdSense';
import Home from './pages/Home';
import RandomQuiz from './pages/RandomQuiz';
import DailyChallenge from './pages/DailyChallenge';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function Placeholder({ title }) {
  return <div className="container text-center">{title} coming soon...</div>;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <div className="app">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Sidebar Ads - Only show on desktop */}
      {isDesktop && (
        <>
          {/* Left Sidebar Ad */}
          <AdSense 
            adSlot="9798030559" 
            adFormat="auto" 
            className="sidebar left"
          />
          
          {/* Right Sidebar Ad */}
          <AdSense 
            adSlot="9798030559" 
            adFormat="auto" 
            className="sidebar right"
          />
        </>
      )}
      
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random" element={<RandomQuiz />} />
          <Route path="/daily" element={<DailyChallenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
