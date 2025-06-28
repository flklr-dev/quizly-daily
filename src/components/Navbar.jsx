import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🧠 Quizly Daily
        </Link>
        <div className="nav-links">
          <Link to="/random" className="nav-link">🎲 Random Quiz</Link>
          <Link to="/daily" className="nav-link">📅 Daily Challenge</Link>
          <Link to="/leaderboard" className="nav-link">🏆 Leaderboard</Link>
          <Link to="/profile" className="nav-link">👤 Profile</Link>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
} 