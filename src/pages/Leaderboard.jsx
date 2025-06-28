import React from 'react';

function getAllDailyScores() {
  const scores = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('daily-')) {
      try {
        const { score } = JSON.parse(localStorage.getItem(key));
        scores.push({ date: key.replace('daily-', ''), score });
      } catch {
        // Ignore invalid JSON
      }
    }
  }
  return scores.sort((a, b) => b.score - a.score);
}

export default function Leaderboard() {
  const scores = getAllDailyScores();
  
  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="mb-4">🏆 Daily Challenge Leaderboard</h2>
        <p className="text-muted">Your best scores from daily challenges</p>
      </div>
      
      {scores.length === 0 ? (
        <div className="card text-center">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="mb-4">No Results Yet</h3>
          <p className="text-muted mb-6">
            Complete your first daily challenge to see your scores here!
          </p>
          <a href="/daily" className="btn btn-secondary">
            📅 Start Daily Challenge
          </a>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Date</th>
                <th>Score</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => {
                const percentage = Math.round((s.score / 5) * 100);
                const rank = i + 1;
                const isTopScore = i === 0;
                
                return (
                  <tr key={s.date} className={isTopScore ? 'font-bold' : ''}>
                    <td className="text-center">
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                    </td>
                    <td>{s.date}</td>
                    <td className="text-center font-bold">{s.score} / 5</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{
                              width: `${percentage}%`,
                              background: percentage >= 80 ? 'linear-gradient(135deg, #10b981, #059669)' :
                                         percentage >= 60 ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                                         'linear-gradient(135deg, #ef4444, #dc2626)'
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {scores.length > 0 && (
        <div className="card mt-8 text-center">
          <h3 className="mb-4">📈 Your Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-primary">{scores.length}</div>
              <div className="text-muted">Challenges Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">
                {Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length * 20)}%
              </div>
              <div className="text-muted">Average Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{scores[0]?.score || 0}/5</div>
              <div className="text-muted">Best Score</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 