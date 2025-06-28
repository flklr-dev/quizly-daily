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
  return scores.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getStreak(scores) {
  if (!scores.length) return 0;
  let streak = 1;
  for (let i = scores.length - 1; i > 0; i--) {
    const d1 = new Date(scores[i].date);
    const d2 = new Date(scores[i - 1].date);
    if ((d1 - d2) / (1000 * 60 * 60 * 24) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getBadges(streak) {
  const badges = [];
  if (streak >= 3) badges.push({ name: '3-day Streak', icon: '🔥', color: '#f59e0b' });
  if (streak >= 7) badges.push({ name: '7-day Streak', icon: '⚡', color: '#10b981' });
  if (streak >= 30) badges.push({ name: '30-day Streak', icon: '👑', color: '#6366f1' });
  return badges;
}

export default function Profile() {
  const scores = getAllDailyScores();
  const streak = getStreak(scores);
  const badges = getBadges(streak);
  const totalChallenges = scores.length;
  const averageScore = totalChallenges > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / totalChallenges * 20) : 0;
  
  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="mb-4">👤 Your Profile & Stats</h2>
        <p className="text-muted">Track your progress and achievements</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl mb-4">🔥</div>
          <div className="text-2xl font-bold text-primary mb-2">{streak}</div>
          <div className="text-muted">Current Streak</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-4">📊</div>
          <div className="text-2xl font-bold text-secondary mb-2">{totalChallenges}</div>
          <div className="text-muted">Challenges Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-4">📈</div>
          <div className="text-2xl font-bold text-accent mb-2">{averageScore}%</div>
          <div className="text-muted">Average Score</div>
        </div>
      </div>
      
      {/* Badges */}
      <div className="card mb-8">
        <h3 className="mb-6 text-center">🏆 Badges Earned</h3>
        {badges.length === 0 ? (
          <div className="text-center">
            <div className="text-3xl mb-4">🎯</div>
            <p className="text-muted mb-4">No badges yet. Keep up your daily streak to earn badges!</p>
            <div className="flex flex-col gap-2 items-center">
              <div className="badge" style={{background: '#f59e0b'}}>🔥 3-day Streak</div>
              <div className="badge" style={{background: '#10b981'}}>⚡ 7-day Streak</div>
              <div className="badge" style={{background: '#6366f1'}}>👑 30-day Streak</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {badges.map(badge => (
              <div key={badge.name} className="badge pulse" style={{background: badge.color}}>
                {badge.icon} {badge.name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Past Results */}
      <div className="card">
        <h3 className="mb-6">📅 Past Results</h3>
        {scores.length === 0 ? (
          <div className="text-center">
            <div className="text-3xl mb-4">📝</div>
            <p className="text-muted mb-6">No results yet. Complete your first daily challenge to see your history!</p>
            <a href="/daily" className="btn btn-secondary">
              📅 Start Daily Challenge
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {scores.map(s => {
              const percentage = Math.round((s.score / 5) * 100);
              return (
                <div key={s.date} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">{s.date}</div>
                    <div className="text-muted">Score: {s.score}/5</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
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
                    <span className="text-sm font-bold">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 