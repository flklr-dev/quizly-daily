import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="fade-in">
      <div className="text-center">
        <h1 className="mb-6">Welcome to Quizly Daily! 🧠</h1>
        <p className="text-muted mb-8">
          Challenge yourself with random or daily quizzes. Come back every day to keep your streak alive and unlock amazing badges!
        </p>
        
        <div className="card mb-8">
          <h3 className="mb-4">🎯 What's New Today?</h3>
          <p className="text-muted">
            Test your knowledge with our curated daily challenge or dive into random trivia from around the world!
          </p>
        </div>
        
        <div className="flex flex-col gap-6 items-center">
          <Link to="/random" className="btn btn-primary">
            🎲 Start Random Quiz
          </Link>
          <Link to="/daily" className="btn btn-secondary">
            📅 Today's Challenge
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h4>Daily Challenges</h4>
            <p className="text-muted">New questions every day to keep you engaged</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">🏆</div>
            <h4>Track Progress</h4>
            <p className="text-muted">Monitor your streaks and earn badges</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">🧠</div>
            <h4>Learn & Grow</h4>
            <p className="text-muted">Expand your knowledge with diverse topics</p>
          </div>
        </div>
      </div>
    </div>
  );
} 