import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container fade-in" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="notfound-emoji" style={{ fontSize: '7rem', marginBottom: '1.5rem', animation: 'bounce 1.5s infinite' }}>🧩</div>
      <h1 className="notfound-title" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '2px', color: 'var(--primary)' }}>
        404 - Page Not Found
      </h1>
      <p className="notfound-desc" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: 400, textAlign: 'center' }}>
        Oops! Looks like you took a wrong turn in the quiz maze.<br />
        But hey, every mistake is a chance to learn something new! 🎉
      </p>
      <button
        className="btn btn-primary"
        style={{ fontSize: '1.1rem', padding: '0.75rem 2.5rem', borderRadius: '2rem', fontWeight: 700, boxShadow: 'var(--shadow-lg)' }}
        onClick={() => navigate('/')}
      >
        🏠 Go Home & Try Again
      </button>
      <div style={{ marginTop: '3rem', opacity: 0.7 }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          <span role="img" aria-label="confused">🤔</span> <span role="img" aria-label="question">❓</span> <span role="img" aria-label="rocket">🚀</span>
        </div>
        <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          Lost? Try a random quiz for a surprise! <br />
          <button className="btn btn-secondary mt-2" onClick={() => navigate('/random')}>🎲 Random Quiz</button>
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
} 